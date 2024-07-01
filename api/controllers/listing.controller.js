import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    // Check if a listing with the same plot number already exists
    const existingListing = await Listing.findOne({ plot: req.body.plot });
    if (existingListing) {
      return next(errorHandler(400, "This plot number is already listed."));
    }

    const listing = new Listing({
      ...req.body,
      userRef: req.user.id,
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

    if (req.user.role !== "superadmin" && req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }

    await Listing.findByIdAndDelete(listingId);
    res.status(200).json({ success: true, message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    if (req.user.role !== 'superadmin' && req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('userRef', 'username');
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
    const listings = await Listing.find().populate('userRef', 'username');
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// New function to check if a plot number already exists
export const checkPlotNumber = async (req, res, next) => {
  try {
    const plotNumber = req.params.plot;
    const existingListing = await Listing.findOne({ plot: plotNumber });
    if (existingListing) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    next(error);
  }
};
