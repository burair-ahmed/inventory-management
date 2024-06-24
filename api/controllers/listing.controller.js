// listing.controller.js

import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = new Listing({
      ...req.body,
      userRef: req.user.id, // Reference to the user creating the listing
    });
    await listing.save();
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listingId = req.params.id;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // Ensure only the user who created the listing or a super admin can delete it
    if (req.user.role !== "superadmin" && req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }

    await Listing.findByIdAndDelete(listingId);
    res
      .status(200)
      .json({ success: true, message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listingId = req.params.id;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // Super admin can update any listing
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      req.body,
      { new: true }
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let status = req.query.status;
    if (status === undefined || status === "false") {
      status = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const filter = {
      name: { $regex: searchTerm, $options: "i" },
      offer,
      status,
      parking,
      type,
    };
    // Only add the userRef filter if the user is an admin
    if (req.user.role === "admin") {
      filter.userRef = req.user.id;
    }
    const listings = await Listing.find(filter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getAllListingsForSuperAdmin = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
