const mongoose = require('mongoose');

const Board = require("./../models/boardModel");
const User = require("../models/userModel");

module.exports.createBoard = async (req, res, next) => {
    try {
        const { boardTitle, boardDescription } = req.body;

        // Check if the requesting user exists
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Requesting user is not a valid user",
                success: false
            });
        }

        // Create member object for the board
        const members = [{
            memberId: req.userId,
            memberRole: 'OWNER',
            lastAccessedAt: null,
        }];

        // Create the board
        const board = await Board.create({
            boardTitle,
            boardDescription,
            members
        });

        console.log(`Board created with details: ${board}`);
        res.status(201).json({ message: "Board created successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports.assignUserToBoard = async (req, res, next) => {
    try {
        const { boardId, userId, role } = req.body;

        console.log(`${boardId} ${userId} ${role}`);

        const [board, user] = await Promise.all([
            Board.findById(boardId),
            User.findById(userId)
        ]);

        if (!board || !user) {
            return res.status(404).json({
                message: "Passed boardID or userId is invalid",
                success: false
            });
        }

        const isAlreadyMapped = board.members.some(member => member.memberId.equals(user._id));

        console.log(`isAlreadyMapped : ${isAlreadyMapped}`);
        if (isAlreadyMapped) {
            return res.status(202).json({
                message: "User is already mapped with board",
                success: true
            });
        }

        board.members.push({
            memberId: userId,
            memberRole: role.toUpperCase(),
            lastAccessedAt: null,
        });

        console.log(board.members);

        const updatedBoard = await Board.findByIdAndUpdate(board._id, board, { new: true });

        console.log(`updated board : ${updatedBoard}`);

        res.status(200).json({ message: "User mapped to board successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Controller function to handle GET request for board details
module.exports.getBoardDetails = async (req, res, next) => {
    try {
        const { boardId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }

        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({
                message: "Board not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Board details retrieved successfully",
            board,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};