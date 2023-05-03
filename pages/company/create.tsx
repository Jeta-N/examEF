import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/SubmitButton';
import Link from 'next/link';
import { ExamEFClient } from '@/functions/swagger/examEFSwagger';
import { notification } from 'antd';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormSchema = z.object({
    name: z.string().nonempty({
        message: 'Nama tidak boleh kosong'
    }).max(100, "Nama tidak boleh lebih dari 100 huruf"),
    address: z.string().nonempty({
        message: 'Address tidak boleh kosong'
    }).max(500, "Address tidak boleh lebih dari 500 huruf"),
    phone: z.string().nonempty({
        message: 'Nomor Telepon tidak boleh kosong'
    }).max(20, "Nomor Telepon tidak boleh lebih dari 20 angka")
        .regex(phoneRegex, "Nomor telepon harus valid")
});

type FormDataType = z.infer<typeof FormSchema>;

const IndexPage: Page = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema)
    });

    const [blobId, setBlobId] = useState('');

    async function onSubmit(data: FormDataType) {
        // console.log(data);

        try {
            const client = new ExamEFClient('http://localhost:3000/api/be');
            await client.registerCompany({
                name: data.name,
                address: data.address,
                phone: data.phone,
                blobId: blobId
            });
            reset();
            notification.success({
                message: 'Success',
                description: 'Successfully created company',
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Failed to created company. It\'s possible the company name is already registered',
                placement: 'bottomRight',
            });
        }
        setImageUrl('')
    }

    const [imageUrl, setImageUrl] = useState("");

    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files == null) {
            console.log("File Null");
            return;
        }
        const fileName = files[0]?.name;
        const fileId = uuidv4();
        const fileType = files[0]?.type;

        const response = await axios.get<string>(`/api/be/api/blob/presigned-put-object?fileName=${fileId}`)
        axios.put(response.data, files[0])

        // console.log(response.data);
        axios.post(`/api/be/api/blob/blob-information?id=${fileId}&fileName=${fileName}&mime=${fileType}`);

        // axios.put(response.data, files[0]);
        const responseUrl = await axios.get(`/api/be/api/blob?fileName=${fileId}`);

        setImageUrl(responseUrl.data)
        setBlobId(fileId);

        e.target.files = null;
    }

    return (
        <div>
            <Title>Create New Company</Title>
            <Link href='/company'>Return to Index</Link>

            <h2 className='mb-5 text-3xl'>Create New Company</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Company Name</label>
                    <input className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='name' {...register('name')}></input>
                    <p className='text-red-500'>{errors['name']?.message}</p>
                </div>
                <div>
                    <label htmlFor='address'>Company Address</label>
                    <input className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='address' {...register('address')}></input>
                    <p className='text-red-500'>{errors['address']?.message}</p>
                </div>
                <div>
                    <label htmlFor='phone'>Company Phone Number</label>
                    <input className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='phone' type='number' {...register('phone')}></input>
                    <p className='text-red-500'>{errors['phone']?.message}</p>
                </div>
                <div>
                    <label htmlFor="companyPicture">Company Picture</label>
                    <input id="companyPicture" name='companyPicture' className='block mt-1 py-3' type="file" onChange={(e) => handleChange(e)} />
                    <img src={imageUrl} alt="" />
                </div>
                <div className='mt-5'>
                    <SubmitButton>Submit</SubmitButton>
                </div>
            </form>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
