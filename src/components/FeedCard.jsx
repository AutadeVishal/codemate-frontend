

const FeedCard = ({ userInfo }) => {
    const {firstName,lastName,skills,about,photoURL}=userInfo;
    return (
        <div className="card bg-base-300 w-80 shadow-sm h-[450px] flex flex-col">
            <figure>
                <img
                className="rounded-2xl"
                    src={photoURL || 'https://via.placeholder.com/150'}
                    alt="User Profile"
                     />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{about}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="badge badge-outline badge-primary">{skill}</span>
                    ))}
                </div>
                <div className="flex gap-5 mt-auto">
                    <button className="btn btn-primary">Ignore</button> 
                     <button className="btn bg-[#F07171]">Interested</button>
                </div>
            </div>
        </div>
    )


}

export default FeedCard;