

const FeedCard = ({ userInfo }) => {
    const {firstName,lastName,skills,about,photoURL}=userInfo;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoURL}
                    alt="Shoes" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{about}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="badge badge-outline badge-primary">{skill}</span>
                    ))}
                </div>
                <div className="flex gap-5 ">
                    <button className="btn btn-primary">Ignore</button>
                     <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    )


}

export default FeedCard;