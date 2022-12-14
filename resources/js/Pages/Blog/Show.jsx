import All from '@/Layouts/All';
import { Link, Head, useForm, usePage } from '@inertiajs/inertia-react';
import { FiEdit3 } from 'react-icons/fi'
import { MdOutlineDelete } from 'react-icons/md'


export default function Index({blog}) {

    const auth = usePage().props.auth;

    const {delete: remove} = useForm();

    const deleteBlog = (id) => {
        const response = confirm("you are about to delete the blog");
        if(response) {
            remove(route("blog.delete", id));
        }
    }

    return (
        <All 
            header={
                <div className='flex justify-between'>
                    <h2 className="flex items-center font-semibold text-xl text-gray-800 leading-tight">Blog</h2>
                    {auth?.user?.type !== 'admin' ? (null):(
                        <Link href={route('blog.create')} className='flex items-center text-indigo-500 font-semibold text-xl'>+Create</Link>
                    )}
                </div>
            }
        >
            <Head title="Blog" />
            <div className='grid gap-7 md:p-9'>
                <div className='flex justify-between'>
                    <p className='flex items-center font-semibold text-5xl'>Blog</p>
                    {auth?.user?.type !== 'admin' ? (null):(
                        <Link href={route('blog.create')} className='flex items-center text-indigo-500 font-semibold text-xl'>+Create</Link>
                    )}
                </div>
                <section className='grid md:grid-cols-9'>
                    <div className='hidden md:block col-span-2'></div>
                    <div className="grid md:col-span-5 gap-7 p-3 md:p-">
                        <div key={blog.id} className='grid gap-2 py-7 relative z-90'>
                            <span className='text-indigo-500 text-3xl'>{blog.title}</span>
                            <p className='grid gap-2 text-lg'>
                                {blog.content}
                            </p>
                            {auth?.user?.type !== 'admin' ? (null):(
                                <div className='flex gap-3 absolute top-3 right-3'>
                                    <Link className='flex items-center text-indigo-500' href={route('blog.edit', blog.id)}>
                                        <FiEdit3 />
                                    </Link>
                                    <button className='flex items-center text-red-500' onClick={() => deleteBlog(blog.id)}>
                                        <MdOutlineDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='hidden md:block col-span-2'></div>
                </section>
            </div>
        </All>
    );
}
