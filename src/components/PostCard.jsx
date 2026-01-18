import React from 'react'
import appwriteService from '../appwrite/config'

import {Link} from 'react-router-dom'
function PostCard({$id,title,featuredImage,content}) {

    console.log("Image URL:", appwriteService.getFileView(featuredImage));


  return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFileView(featuredImage)} alt={title}
                    className='rounded-xl'
                    />
                </div>
            </div>
            
            <h2 className="text-lg font-semibold">{title}</h2>

         {/* <p className="text-sm text-gray-600 line-clamp-3">
          {content?.replace(/<[^>]*>/g, "")}
        </p> */}

        </Link>
  )
}

export default PostCard