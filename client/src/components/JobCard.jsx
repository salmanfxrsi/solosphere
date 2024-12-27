/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    deadline,
    description,
    category,
    min_price,
    max_price,
    buyer,
    bid_count
  } = job;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Cannot bid on own post validation
  const handleNavigate = () => {
    if (user.email === buyer.email)
      return toast.error("Cannot Bid On Your Own Post");
    navigate(`/job/${_id}`);
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">
          Deadline: {format(new Date(deadline), "P")}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
          {category}
        </span>
      </div>

      <div className="text-left">
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">{title}</h1>

        <p className="mt-2 text-sm text-gray-600 ">{description}</p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Range: ${min_price} - ${max_price}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">Total Bids: {bid_count}</p>
      </div>
    </button>
  );
};

export default JobCard;
