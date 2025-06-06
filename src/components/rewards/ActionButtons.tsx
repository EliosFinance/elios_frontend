import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '../ui/button';

const ActionButtons = () => {
	return (
		<div className='flex justify-between gap-2 mb-4'>
			<Button className='w-[48%] px-4 py-2 mr-2 h-12 text-white bg-blue-500 active:bg-blue-500 focus:bg-blue-500 rounded-lg text-sm'>Activité</Button>
			<Drawer>
				<DrawerTrigger asChild>
					<Button className='w-[48%] px-4 py-2 h-12 text-white bg-blue-500 active:bg-blue-500 focus:bg-blue-500 rounded-lg text-sm'>
						Comment ça marche
					</Button>
				</DrawerTrigger>
				<DrawerContent className="fixed inset-0 z-50 flex flex-col w-full h-full max-w-full max-h-full px-0 pt-0 pb-4 overflow-y-auto bg-white shadow-lg dark:bg-gray-900">
					<div className="fixed inset-0 z-40" />
					<DrawerHeader className="px-6 pt-6 pb-2">
						<DrawerTitle>Comment ça marche</DrawerTitle>
					</DrawerHeader>
					<div className='flex-1 px-6 overflow-y-auto'>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
						<p>Explaining text goes here...</p>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default ActionButtons;
