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

        const board = await Board.findById(boardId);
        const user = await User.findById(userId);
        if(!board || !user){
            res.status(404).json({
                message: "passed boardID or userId is invalid",
                success: false
            })
        }

        console.log(board.members[0].memberId);
        console.log(user._id);
        const isAlreayMapped = board.members.some((member) => member.memberId === user._id);

        console.log(`isAlreayMapped : ${isAlreayMapped}`);
        if(isAlreayMapped === -1){
            res.status(202).json({
                message: "user is already mapped with board",
                success: true
            })
            return;
        }

        board.members = [...board.members, {
            memberId: userId,
            memberRole: role.toUpperCase(),
            lastAccessedAt: null,
        }]
        
        // const updatedBoard = await Board.findByIdAndUpdate(board._id, board)
        // console.log(`updated board : ${updatedBoard}`);

        res.status(200).json({ message: "User mapped to board successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}