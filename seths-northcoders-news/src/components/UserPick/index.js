import React from "react";
import { Input } from "react-materialize";

class UserPick extends React.Component {
  render() {
    const { users, defaultOption, handleUserPick } = this.props;

    users.sort((a, b) => {
      if (a.username < b.username) return -1;
      if (a.username > b.username) return 1;
      return 0;
    });
    return (
      <div>
        {defaultOption === "guest" ? (
          <Input
            s={3}
            type="select"
            label="SELECT USER"
            onChange={handleUserPick}
          >
            {this.userOptions(users)}
          </Input>
        ) : (
          <Input
            s={3}
            type="select"
            label="SELECT USER"
            defaultValue={defaultOption}
            onChange={handleUserPick}
          >
            <option value={defaultOption}>{defaultOption}</option>
            {this.userOptions(users)}
          </Input>
        )}
      </div>
    );
  }

  userOptions = users => {
    return users.map(user => {
      return (
        <option key={user.username} value={user.username}>
          {user.username}
        </option>
      );
    });
  };
}

// const UserPick = ({ users, defaultOption, handleUserPick }) => {
//   users.sort((a, b) => {
//     if (a.username < b.username) return -1;
//     if (a.username > b.username) return 1;
//     return 0;
//   });
//   return (
//     <div>
//       {defaultOption === "guest" ? (
//         <Input
//           s={3}
//           type="select"
//           label="SELECT USER"
//           onChange={handleUserPick}
//         >
//           {users.map(user => {
//             return (
//               <option key={user.username} value={user.username}>
//                 {user.username}
//               </option>
//             );
//           })}
//         </Input>
//       ) : (
//         <Input
//           s={3}
//           type="select"
//           label="SELECT USER"
//           defaultValue={defaultOption}
//           onChange={handleUserPick}
//         >
//           <option value={defaultOption}>{defaultOption}</option>

//           {users.map(user => {
//             return (
//               <option key={user.username} value={user.username}>
//                 {user.username}
//               </option>
//             );
//           })}
//         </Input>
//       )}
//     </div>
//   );
// };

export default UserPick;
