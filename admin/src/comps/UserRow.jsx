function UserRow({ user, index }) {
  return (
    <tr className={`${index % 2 === 0 ? "bg-red-100" : ""} text-[12px]`}>
      <td className="py-2 px-1 border">{user._id}</td>
      <td className="py-2 px-1 border">{user.email}</td>
      <td className="py-2 px-1 border">{user.createdAt}</td>
      <td className="py-2 px-1 border">{user.fullName}</td>
      <td className="py-2 px-1 border">{user.phoneNumber}</td>
      <td className="py-2 px-1 border">{user.role}</td>
    </tr>
  );
}

export default UserRow;
