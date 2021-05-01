var express = require("express");
var router = express.Router();
var locationController = require("../controllers/locationController");

// mostra todos locations
router.get("/", (req, res) => {
  //ShowAll
  locationController
    .showAll()
    .then((data) => {
      res.render("locations/listAll", { locations: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// mostra 1 location por id
router.get("/:id", (req, res) => {
  //Show
  let id = req.params.id;
  locationController
    .show(id)
    .then((data) => {
      res.render("locations/viewDetails", { location: data });
    })
    .catch((error) => {
      res.render("error", { error: error, message: "Não encontrei mano" });
    });
});

// form para criar 1 location
router.get("/create/form", (req, res) => {
  res.render("locations/createForm");
});

router.post("/create", (req, res) => {
  let body = req.body;
  console.log(body);
  locationController
    .create(body)
    .then((data) => {
      res.redirect("/locations");
    })
    .catch((error) => {
      res.redirect("/error");
    });
}); //create

router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  locationController
    .show(id)
    .then((data) => {
      res.render("locations/editDetails", { location: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
}); //formEdit

router.post("/edit/:id", (req, res) => {
  let body = req.body;
  let id = req.params.id;

  locationController
    .edit(id, body)
    .then((data) => {
      res.redirect("/locations/" + id);
    })
    .catch((error) => {
      res.redirect("/error");
    });
}); //edit

// elimina 1 location
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  locationController
    .delete(id)
    .then((data) => {
      res.redirect("/locations");
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

module.exports = router;
