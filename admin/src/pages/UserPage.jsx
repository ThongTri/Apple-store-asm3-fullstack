import { useState } from "react";
import Layout from "../comps/Layout";
import { useEffect } from "react";
import UserRow from "../comps/UserRow";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(
          `http://localhost:5000/user/admin?page=${page}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUsers(data.data.users);
        setMaxPage(data.data.totalPage);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUsers();
  }, [page]);
  function handleLeftPagination() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }
  function handleRightPagination() {
    if (page === maxPage) return;
    setPage((prev) => prev + 1);
  }
  return (
    <Layout pageName="Users Page">
      <div className="w-full p-2">
        <div className="flex capitalize justify-between items-center mt-4 px-4">
          <h2>User</h2>
        </div>
        <table className="border border-gray-20 mt-8 min-w-full mx-auto">
          <thead className="py-2 px-1 capitalize text-[16px]">
            <tr className="border-b border-gray-300 text-gray-700 text-left capitalize py-8">
              <th className="border-l px-2">ID</th>
              <th className="border-l px-1 ">email</th>
              <th className="border-l px-1 ">created at</th>
              <th className="border-l px-1 ">full name</th>
              <th className="border-l px-1 ">phone number</th>
              <th className="border-l px-1 ">role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return <UserRow user={user} index={index} key={user._id} />;
            })}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 items-center mt-3">
          <button
            type="button"
            className="border border-gray-400 px-2 py-1"
            onClick={handleLeftPagination}>
            {"<"}
          </button>
          <p>{page}</p>
          <button
            type="button"
            className="border border-gray-400 px-2 py-1"
            onClick={handleRightPagination}>
            {">"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
