"use client";
import { useEffect, useState } from "react";

type User = {
  firstName: string;
  email: string;
  lastName: string;
  id: number;
  role: string;
  birthDate: string;
  age: number;
};
type UserData = User[];
const Table = () => {
  const [data, setData] = useState<UserData>([]);
  const [inputVal, setInputVal] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ column: "", direction: true });
  useEffect(() => {
    (async () => {
      const res = await fetch("https://dummyjson.com/users?limit=200");
      const result = await res.json();
      setData(result.users);
    })();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setInputVal(value);
    setCurrentPage(0);
  };
  const filtered = data.filter(
    (user) =>
      user.firstName.includes(inputVal) ||
      user.lastName.includes(inputVal) ||
      user.email.includes(inputVal),
  );
  const totalPages = Math.ceil(filtered.length / 10);

  const start = currentPage * 10;

  const handlePagination = (i : number) => {
    setCurrentPage(i);
  };

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig.column) return 0; // no sort applied

    const dir = sortConfig.direction === true ? 1 : -1;

    if (sortConfig.column === "name") {
      return a.firstName.localeCompare(b.firstName) * dir;
    }
    if (sortConfig.column === "age") {
      return (a.age - b.age) * dir;
    }
    if (sortConfig.column === "birthDate") {
      return (new Date(a.birthDate) - new Date(b.birthDate)) * dir;
    }
    if (sortConfig.column === "email") {
      return a.email.localeCompare(b.email) * dir;
    }
    if (sortConfig.column === "role") {
      return a.role.localeCompare(b.role) * dir;
    }
    // add other columns
    return 0;
  });

  const paginatedUsers = sorted.slice(start, start + 10);
  return (
    <div className="flex flex-col justify-center">
      <input
        placeholder="Search by name or email"
        value={inputVal}
        className="p-2 m-2 border border-gray-700 rounded"
        onChange={(e) => handleInput(e)}
      />
      <table>
        <thead>
          <tr>
            <th
              className="cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => ({
                  ...prev,
                  column: "name",
                  direction: prev.column === "name" ? !prev.direction : true,
                }))
              }
            >
              Name{" "}
              {sortConfig.column === "name"
                ? sortConfig.direction
                  ? " ↑"
                  : " ↓"
                : ""}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => ({
                  ...prev,
                  column: "email",
                  direction: prev.column === "email" ? !prev.direction : true,
                }))
              }
            >
              Email{" "}
              {sortConfig.column === "email"
                ? sortConfig.direction
                  ? " ↑"
                  : " ↓"
                : ""}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => ({
                  ...prev,
                  column: "role",
                  direction: prev.column === "role" ? !prev.direction : true,
                }))
              }
            >
              Role{" "}
              {sortConfig.column === "role"
                ? sortConfig.direction
                  ? " ↑"
                  : " ↓"
                : ""}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => ({
                  ...prev,
                  column: "age",
                  direction: prev.column === "age" ? !prev.direction : true,
                }))
              }
            >
              Age{" "}
              {sortConfig.column === "age"
                ? sortConfig.direction
                  ? " ↑"
                  : " ↓"
                : ""}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => ({
                  ...prev,
                  column: "birthDate",
                  direction:
                    prev.column === "birthDate" ? !prev.direction : true,
                }))
              }
            >
              Joined date
              {sortConfig.column === "birthDate"
                ? sortConfig.direction
                  ? " ↑"
                  : " ↓"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.age}</td>
              <td>{user.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && inputVal !== "" && <div>No results</div>}
      <div className="flex w-full self-center gap-4 p-3 justify-center">
        {Array(totalPages)
          .fill(0)
          .map((_, i) => {
            return (
              <button
                onClick={() => handlePagination(i)}
                key={i}
                className={`cursor-pointer p-2 border border-gray-400 ${currentPage === i && "bg-gray-400"}`}
              >
                {i + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Table;
