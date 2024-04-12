"use client";
import React, { memo, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { trpc } from "~/utils/trpc";
import { useParams } from "next/navigation";
import CheckBox from "~/app/assets/icons/CheckBox";
import CheckedCheckBox from "~/app/assets/icons/CheckedCheckBox";

interface InterestsPayload {
  id: string;
  interests?: string[];
}

interface UserPayload {
  id: string;
}

interface Interests {
  id: string;
  interest: string;
}

const Interests = () => {
  const [interest, setInterest] = useState<Interests[] | null>(null);
  const [displayInterests, setDisplayInterests] = useState<Interests[] | null>(
    null,
  );
  const [displayPagination, setDisplayPagination] = useState<number[]>([]);
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);

  const { id }: { id: string } = useParams();

  const { mutate: getUserFun } = trpc.getUserById.useMutation<UserPayload>({
    onSuccess(data: any) {
      if (data.data.user) setUserInterests(data.data.user.interests);
    },
  });

  const { data: getInterests } = trpc.getInterests.useQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const interestsPerPage = 6;

  const getPaginatedInterests = (interestList: Interests[], page: number) => {
    const indexOfLastInterest = page * interestsPerPage;
    const indexOfFirstInterest = indexOfLastInterest - interestsPerPage;
    const currentInterests = interestList?.slice(
      indexOfFirstInterest,
      indexOfLastInterest,
    );

    setDisplayInterests(currentInterests);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    getPaginatedInterests(getInterests?.data.interests ?? [], currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    getPaginatedInterests(getInterests?.data.interests ?? [], currentPage - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getPaginatedInterests(getInterests?.data.interests ?? [], pageNumber);
  };

  const displayPageNumbers = (interestList: Interests[], newSet: number) => {
    const tempArray = [];
    for (
      let i = 1;
      i <= Math.ceil(interestList?.length / interestsPerPage);
      i++
    ) {
      tempArray.push(i);
    }
    setPageNumbers(tempArray);
    const indexOfLastItem = (newSet + 1) * 6;
    const indexOfFirstItem = indexOfLastItem - 6;
    const currentItems = tempArray.slice(indexOfFirstItem, indexOfLastItem);
    setDisplayPagination(currentItems);
  };

  const prevSet = () => {
    setCurrentSet(currentSet - 1);
    const newSet = currentSet - 1;
    displayPageNumbers(getInterests?.data.interests ?? [], newSet);
  };

  const nextSet = () => {
    setCurrentSet(currentSet + 1);
    const newSet = currentSet + 1;
    displayPageNumbers(getInterests?.data.interests ?? [], newSet);
  };

  const handleInterestSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    clickedInterest: any,
  ) => {
    const selectedInterests = userInterests ? userInterests : [];

    const exists = selectedInterests.find((each) => each == clickedInterest.id);

    if (exists) {
      selectedInterests.splice(
        selectedInterests.indexOf(clickedInterest.id),
        1,
      );
    } else {
      selectedInterests.push(clickedInterest.id);
    }
    setUserInterests(selectedInterests);

    const temp: InterestsPayload = {
      id: id,
      interests: selectedInterests,
    };

    updateFn(temp);
  };

  const { mutate: updateFn } = trpc.updateUser.useMutation();

  useEffect(() => {
    setInterest(getInterests?.data.interests ?? []);
    getPaginatedInterests(getInterests?.data.interests ?? [], 1);
    displayPageNumbers(getInterests?.data.interests ?? [], 0);
  }, [getInterests]);

  useEffect(() => {
    getUserFun({ id });
  }, [id]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="mb-20 flex justify-center">
        <div className="mt-7 w-[40%] rounded-xl border border-solid border-gray-300 p-5">
          <h1 className="py-4 text-center text-lg font-bold">
            Please mark your interests!
          </h1>
          <p className="py-4 text-center text-sm">We will keep you notified</p>

          <div>
            <h2 className="text-m mb-2 ml-5 font-semibold">
              My saved interests!
            </h2>

            {displayInterests &&
              displayInterests.map((eachInterest: any) => (
                <div key={eachInterest.id} className="flex p-2">
                  <input
                    id={eachInterest.id}
                    className="appearance-none "
                    type="checkbox"
                    onChange={(e) => handleInterestSelection(e, eachInterest)}
                    checked={userInterests?.includes(eachInterest.id)}
                  />
                  {userInterests?.includes(eachInterest.id) ? (
                    <label htmlFor={eachInterest.id}>
                      <CheckedCheckBox />
                    </label>
                  ) : (
                    <label htmlFor={eachInterest.id}>
                      <CheckBox />
                    </label>
                  )}

                  <p className="ml-2 text-sm">{eachInterest.interest}</p>
                </div>
              ))}

            <div>
              <div className="text-gray-400">
                <button
                  className="mr-2"
                  onClick={prevSet}
                  disabled={currentSet <= 0}
                >
                  {"<<"}
                </button>
                <button
                  className="mr-2"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                {displayPagination.map((number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={
                      currentPage === number
                        ? "p-2 font-bold text-black"
                        : "p-2"
                    }
                  >
                    {number}
                  </button>
                ))}
                <button
                  className="ml-2"
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil((interest?.length ?? 0) / interestsPerPage)
                  }
                >
                  {">"}
                </button>
                <button
                  className="ml-2"
                  onClick={nextSet}
                  disabled={
                    currentSet >= Math.ceil(pageNumbers?.length / 6) - 1
                  }
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Interests);
