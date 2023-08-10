const express=require('express');
const request=require('request-promise');


const PORT=process.env.PORT || 3000;

const generateScraperUrl=(apiKey)=>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
const app=express();
app.get('/',(req,res)=>{
    res.send("Welcome to Amazon Web Scrapper API.")
})
// Get product details

app.get('/products/:productId',async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    try {
        const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.send(error)
    }
})
// Get product reviews
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    try {
        const response =await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.send(JSON.parse(response))
    } catch (error) {
        res.send(error)
    }
})
// Get product offers
app.get('/products/:productId/offers',async(req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    try {
        const response =await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.send(JSON.parse(response))
    } catch (error) {
        res.send(error)
    }
})
// Get Search Query
app.get('/search/:searchQuery',async (req,res)=>{
    const {searchQuery}=req.params;
    const {api_key}=req.query;
    try {
        const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.send(JSON.parse(response))
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT ,()=>{
    console.log(`Server listeing at ${PORT}`)
})