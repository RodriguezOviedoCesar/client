

const UserTables = ({ obj }) => {


  return (
  <tr key={obj.id}>
  <td>{obj.dni}</td>
  <td>{obj.type}</td>
  <td>{obj.email}</td>
  <td>{obj.username}</td>
  <td>{obj.status}</td>
  <td>{obj.firstname +' '+obj.lastname}</td>
  <td>{obj.direction}</td>
  <td>{obj.phone}</td>
  </tr>
  );
};

export default UserTables;
