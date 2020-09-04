/**
 * AnnouncementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // Get list of announcements
	getAnnouncements: function(req, res) {

        Announcement.find({
            where: {user_id: req.user_id}
        }).sort('createdAt DESC').exec((err, announcements) => {

            if (err) return res.status(400).json(err.message);

            res.json(announcements);
        });
    },

    // Add a announcement
    addAnnouncement: function(req, res) {

        var user_id = req.user_id;
        var subject = req.body.subject;
        var category = req.body.category;
        var description = req.body.description;

        if (!subject || !category || !description) return res.badRequest('Invalid Request..');

        var announcementDetails = {
            user_id: user_id,
            subject: subject,
            category: category,
            description: description,
        };
        
        Announcement.create(announcementDetails).exec((err) => {

            if (err) return res.status(400).json(err.message);

            res.json({
                success: true,
            });
        });
    },

};
