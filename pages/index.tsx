import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import HomePage from "../Components/HomePage"
import HorlogePage from "../Components/HorlogePage"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

import {search} from "../lib/cloudinary"

export default function Home(images: any) {
  
  return (
    <div>
      <Head>
        <title>Site Papa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage/>
      {HorlogePage(images)}
    </div>
    
   
  )
}
export async function getStaticProps(){
  const resultsHorloge = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders/horloge/image`,{
    headers :{
        Authorization:`Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString("base64")}`
    }
}).then(r=> r.json());
const {horloge}=resultsHorloge
console.log("horloge",resultsHorloge)

  const results = await search()
  const {resources}= results

  const images = resources.map((resource: {
    public_id: any
    secure_url: any 
    asset_id: any
    width : any
    height : any
}) => {
    const {width,height}=resource;
    return{
      id    : resource.asset_id,
      title : resource.public_id,
      image : resource.secure_url,
      width,
      height
      
    }
  })
  return{
      props : {
        images,
      }
  }
}