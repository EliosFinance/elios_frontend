import InputApp from '@/components/InputApp'
import React, { useEffect, useState } from 'react'
import { cardTypesEnum, categoriesEnum, subjects, subjectType } from './temp/data'
import { APP_ROUTES_ENUM } from '@/main'
import Carousel from './carousel/Carousel'
import Card from './Card'


const Learn = () => {
  const [search, setSearch] = useState<string>('')
  const [filteredSubjects, setFilteredSubjects] = useState<subjectType[]>([])
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false)

  useEffect(() => {
    if(search.length > 2) {
      setIsUserTyping(true)
      const filtered = subjects.filter((subject) => subject.title.toLowerCase().includes(search.toLowerCase()))
      setFilteredSubjects(filtered)
    } else {
      setIsUserTyping(false)
    }

  }, [search]);

  return (
    <div className='w-full flex justify-center items-center flex-col gap-y-12'>
      <div className='w-full flex justify-center items-start flex-col px-6'>
        <h2 className='text-2xl font-black'>EliosLearn</h2>
        <InputApp type='text' placeholder='Recherchez une idée, un sujet, ...' value={search} onChange={(e) => setSearch(e.target.value)} endIcon />
      </div>
      {
        isUserTyping ? (
          <div className='w-full flex justify-center items-center flex-col px-6'>
            <h2 className='text-2xl font-black'>Résultats de recherche</h2>
            <div className='w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4'>
              <Carousel slides={filteredSubjects} options={{loop: false, containScroll: false}} cardVariant={cardTypesEnum.SMALL_PREVIEW} />
            </div>
          </div>
        ) : (
          <>
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
                      className='w-[47.6%] h-12 flex justify-center items-center bg-blue-500 rounded-3 text-white font-semibold text-lg' 
                      href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${i}`}
                      key={i}
                    >
                      {Object.values(categoriesEnum)[i]}
                    </a>
                  ))
                }
              </div>
            </div>

            <div className='w-full flex justify-center items-start flex-col'>
              <h2 className='text-2xl font-black px-6'>Les plus populaires</h2>
              <div className='w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4'>
                <Carousel slides={subjects} options={{loop: false, containScroll: false}} cardVariant={cardTypesEnum.SMALL_PREVIEW} />
              </div>
            </div>
            <Card project={subjects[0]} variant={cardTypesEnum.FULL_ROUNDED_IMAGE} cardToDisplay={0}/>
          </>
        )
      }
    </div>
  )
}

export default Learn