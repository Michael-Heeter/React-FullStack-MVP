const Users = ({retrievingUsers, getSingleUserTasks}) => {
    return retrievingUsers.map((user) => (
        <PostUser user={user}
         key={user.id}
         getSingleUserTasks={getSingleUserTasks}
         />
    ))
}

export default Users