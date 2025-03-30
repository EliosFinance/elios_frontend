import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
    id: string;
    title: string;
    author: string;
    publishedAt: Date;
    imageUrl: string;
}

const BlogPosts = () => {
    const navigate = useNavigate();
    const blogPosts: BlogPost[] = [
        {
            id: '1',
            title: 'Analyser mes dépenses comme un pro',
            author: 'Florian P.',
            publishedAt: new Date(),
            imageUrl:
                'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8fDA%3D',
        },
        {
            id: '2',
            title: "Comment la banque centrale joue un rôle majeur dans l'économie",
            author: 'Louis P.',
            publishedAt: new Date(),
            imageUrl:
                'https://images.unsplash.com/photo-1732254721629-bf8275f694e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D',
        },
    ];

    const handleBlogClick = (blogId: string) => {
        navigate(`/blog/${blogId}`);
    };

    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className='w-full'
        >
            <CarouselContent className='-ml-2 md:-ml-4'>
                {blogPosts.map((post, index) => (
                    <CarouselItem
                        key={post.id}
                        className='pl-2 md:pl-4 basis-full md:basis-1/2' // Shows 2 cards per screen on md+ screens
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            onClick={() => handleBlogClick(post.id)}
                            className='h-full cursor-pointer'
                        >
                            <Card className='h-full'>
                                <CardHeader className='relative aspect-[16/9] p-0'>
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className='object-cover w-full h-full rounded-t-lg'
                                    />
                                </CardHeader>
                                <CardContent className='p-6'>
                                    <CardTitle className='mb-4 text-xl line-clamp-2'>{post.title}</CardTitle>
                                    <div className='flex items-center justify-between text-sm text-gray-500'>
                                        <span>Par {post.author}</span>
                                        <span>
                                            {format(post.publishedAt, "'Il y a' d 'min'", {
                                                locale: fr,
                                            })}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex' />
            <CarouselNext className='hidden md:flex' />
        </Carousel>
    );
};

export default BlogPosts;
