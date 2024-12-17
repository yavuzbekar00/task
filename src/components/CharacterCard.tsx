"use client";
import { useState, useEffect } from "react";

function CharacterCard() {
  const [myData, setMyData] = useState<any>(null);
  const [genders, SetGenders] = useState(["male", "female"]);
  const [selectedGender, setSelectedGender] = useState("All");

  const [status, SetStatus] = useState(["alive", "dead"]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data = await res.json();
        setMyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!myData) {
    return <div>Loading...</div>;
  }

  const filteredCharacters =
    selectedGender === "All"
      ? myData.results
      : myData.results.filter(
          (character: any) =>
            character.gender.toLowerCase() === selectedGender.toLowerCase()
        );

  const finalFilteredCharacters =
    selectedStatus === "All"
      ? filteredCharacters
      : filteredCharacters.filter(
          (character: any) =>
            character.status.toLowerCase() === selectedStatus.toLowerCase()
        );

  return (
    <div className="flex">
      <div className="w-[250px] fixed left-0 top-0 h-full bg-blue-100 p-5 overflow-scroll">
        <div className="flex flex-col gap-5">
          <p className="text-black container font-bold text-3xl">FILTER</p>

          <div>
            <label htmlFor="gender" className="block text-black">
              Gender
            </label>
            <select
              id="gender"
              value={selectedGender}
              onChange={handleGenderChange}
              className="mt-2 p-2 w-full bg-black border border-gray-300 rounded"
            >
              <option value="All">All</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-black">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="mt-2 p-2 w-full bg-black border border-gray-300 rounded"
            >
              <option value="All">All</option>
              {status.map((statu) => (
                <option key={statu} value={statu}>
                  {statu}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="ml-[250px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 overflow-scroll">
        {finalFilteredCharacters && finalFilteredCharacters.length > 0 ? (
          finalFilteredCharacters.map((data: any) => (
            <div
              key={data.id}
              className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white"
            >
              <div className="flex items-center justify-center p-3 rounded-xl overflow-hidden">
                <img
                  className="object-cover"
                  src={data.image}
                  alt={data.name}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Species:</span> {data.species}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Gender:</span> {data.gender}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Status:</span> {data.status}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Origin Name:</span>{" "}
                  {data.origin.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Location Name:</span>{" "}
                  {data.location.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No characters available</p>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
