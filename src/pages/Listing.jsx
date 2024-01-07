import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";

function Listing() {
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shareLinkCopy, setShareLinkCopy] = useState(false);

	const navigate = useNavigate();
	const params = useParams();
	const auth = getAuth();

	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log(docSnap.data());
				setListing(docSnap.data());
				setLoading(false);
			}
		};
		fetchListing();
	}, [navigate, params.listingId]);
	if (loading) {
		return <Spinner />;
	}
	return (
		<main>
			<div
				className="shareIconDiv"
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
					setShareLinkCopy(true);
					setTimeout(() => {
						setShareLinkCopy(false);
					}, 2000);
				}}
			>
				<img src={shareIcon} alt="" />
			</div>

			{shareLinkCopy && <p className="linkCopied">Link Copied to Clipboard</p>}

			<div className="listingDetails">
				<p className="listingName">
					{listing.Name} - Rs.
					{listing.offer
						? listing.discountedPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						: listing.regular.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</p>
				<p className="listingLocation">{listing.location}</p>
				<p className="listingType">
					For {listing.type === "rent" ? "Rent" : "Sale"}
				</p>
				{listing.offer && (
					<p className="discountPrice">
						Rs. {listing.regular - listing.discountedPrice} discount
					</p>
				)}
				<ul className="listingDetailsList">
					<li>
						{listing.bedrooms > 1
							? `${listing.bedrooms} Bedrooms`
							: "1 Bedroom"}
					</li>
					<li>
						{listing.bathrooms > 1
							? `${listing.bathrooms} Bathrooms`
							: "1 Bathroom"}
					</li>
					<li>{listing.parking && "Parking Spot Available"}</li>
					<li>{listing.furnished && "Furnished Housing"}</li>
				</ul>

				<p className="listingLocationTitle">Location</p>

				<div className="leafletContainer">
					<MapContainer
						style={{ height: "100%", width: "100%" }}
						center={[listing.geolocation.lat, listing.geolocation.lng]}
						zoom={13}
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker
							position={[listing.geolocation.lat, listing.geolocation.lng]}
						>
							<Popup>{listing.Name}</Popup>
						</Marker>
					</MapContainer>
				</div>

				{auth.currentUser?.uid !== listing.userRef && (
					<Link
						to={`/contact/${listing.userRef}?listingName=${listing.Name}`}
						className="primaryButton"
					>
						Contact the Landlady
					</Link>
				)}
			</div>
		</main>
	);
}

export default Listing;
