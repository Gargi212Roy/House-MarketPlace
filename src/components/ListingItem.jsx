import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as deleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathTubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageURLs[0]}
          alt={listing.Name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.Name}</p>
          <p className="categoryListingPrice">
            Rs.
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regular
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {/* && is a shortway of writing ternary without an else condition */}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} BedRooms`
                : "1 BedRoom"}
            </p>
            <img src={bathTubIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} BathRooms`
                : "1 BathRoom"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <deleteIcon
          className="removeIcon"
          fill="red"
          onClick={() => onDelete(listing.id, listing.Name)}
        />
      )}
    </li>
  );
}

export default ListingItem;
