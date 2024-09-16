import InputApp from '@/components/InputApp'
import React, { useState } from 'react'
import { categoriesEnum } from './temp/data'
import { APP_ROUTES_ENUM } from '@/main'
import Carousel from './carousel/Carousel'
import { EmblaOptionsType } from 'embla-carousel'


const Learn = () => {
  const [search, setSearch] = useState<string | null>(null)
  const OPTIONS: EmblaOptionsType = { loop: true, containScroll: false }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className='w-full flex justify-center items-center flex-col gap-y-10'>
        <div className='w-full flex justify-center items-start flex-col px-6'>
          <h2 className='text-2xl font-black'>EliosLearn</h2>
          <InputApp type='text' placeholder='Recherchez une idée, un sujet, ...' value={search} onChange={(e) => setSearch(e.target.value)} endIcon />
        </div>
        
        <div className='w-full flex justify-center items-start flex-col px-6'>
          <div className='w-full flex justify-between items-center'>
            <h2 className='text-2xl font-black'>Pour vous</h2>
            <a 
              className='text-sm font-semibold text-blue-500'
              href={APP_ROUTES_ENUM.ARTICLE_CATEGORIES}
            >
                Voir tout &gt;
            </a>
          </div>
          <div className='w-full flex justify-between items-start flex-wrap mt-3 gap-y-4 gap-x-4'>
            {
              [1, 2, 3, 4].map((i) => (
                <a 
                  className='w-[47.6%] h-12 flex justify-center items-center bg-blue-500 rounded-3 text-white font-semibold' 
                  href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${i}`}
                >
                  {Object.values(categoriesEnum)[i]}
                </a>
              ))
            }
          </div>
        </div>

      <div className='w-full flex justify-center items-start flex-col'>
        <h2 className='text-2xl font-black px-6'>Les plus populaires</h2>
        <div className='w-full flex justify-between items-start flex-wrap mt-3 gap-y-4 gap-x-4'>
          <Carousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>
    </div>
  )
}

export default Learn