const { verifyTokenAndAdmin , verifyToken, verifyTokenAndAuthorization} = require("../middleware/auth")
const Article= require("../models/article")

const router= require("express").Router()


//Create

router.post("/", verifyTokenAndAdmin ,createArticle)
router.put("/:id", verifyTokenAndAdmin, updateArticle)
router.delete("/:id", verifyTokenAndAdmin , deleteArticle)
router.get("/find/:id",getArticle )
router.get("/find/",getArticles )

