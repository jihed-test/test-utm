var express = require("express");
const {
  Register,
  Login,
  Test,
  Admin,
} = require("../controllers/users.controllers");
var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile } = require("../controllers/profile.controllers");
const {AddEventList, FindAllEventList,DeleteEventList} = require("../controllers/eventlist.controllers");
const {AddEvent,UpdteEvent,FindAllEventUser,FindSingleEventUser,DeleteEventTitle,delaitCommentEvent,DeleteSingleEventUser,FindAllEventByTitle} = require("../controllers/event.controllers");
/* users routes. */
router.post("/register", Register);
router.post("/login", Login);

/* add profile route */
router.post("/profiles",
  passport.authenticate("jwt", { session: false }),
  AddProfile);
/* get all profiles */
router.get("/profiles",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  FindAllProfiles);
/* get one profiles */
router.get("/profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile);
/* delete profiles */
router.delete("/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile);
  /* add EventList  */
router.post("/eventList",
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
AddEventList);
/* get all Event List */
router.get("/eventsList",
FindAllEventList);
/* delete profiles */
router.delete("/eventsList/:id",
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
DeleteEventList);
/* add Event user  */
router.post("/event",
passport.authenticate("jwt", { session: false }),
AddEvent);
/* Find Single Event User */
router.get("/event/:title",
passport.authenticate("jwt", { session: false }),
FindSingleEventUser);
/* Find All Event User */
router.get("/AllEvent",
passport.authenticate("jwt", { session: false }),
FindAllEventUser);
/* delete Event title */
router.delete("/eventTitle/:title",
passport.authenticate("jwt", { session: false }),
DeleteEventTitle);
/* delete Single Event User */
router.delete("/event/:id",
passport.authenticate("jwt", { session: false }),
DeleteSingleEventUser);
/* Find All Event User */
router.get("/eventTitle/:title",
passport.authenticate("jwt", { session: false }),
FindAllEventByTitle);
router.post("/event1",
passport.authenticate("jwt", { session: false }),
UpdteEvent);
router.post("/event2",
passport.authenticate("jwt", { session: false }),
delaitCommentEvent);
module.exports = router;
