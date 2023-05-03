import Link from 'next/link';
import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { useRouter } from 'next/router';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/SubmitButton';
import { Spin, notification } from 'antd';
import { CompanyDataResponse, ExamEFClient } from '@/functions/swagger/examEFSwagger';
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

const EditForm: React.FC<{
    id: string,
    name: string,
    address: string,
    phone: string,
    onEdit: () => void
}> = ({ id, name, address, phone, onEdit }) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: name,
            address: address,
            phone: phone
        }
    });
    const [blobId, setBlobId] = useState('');
    async function onSubmit(data: FormDataType) {
        try {
            const client = new ExamEFClient('http://localhost:3000/api/be');
            await client.updateCompany(id, {
                id: parseInt(id),
                name: data.name,
                address: data.address,
                phone: data.phone,
                blobId: blobId,
            });
            reset({
                name: data.name,
                address: data.address,
                phone: data.phone
            });
            onEdit();
            notification.success({
                message: 'Success',
                description: 'Successfully edited company data',
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Failed to edited company data.',
                placement: 'bottomRight',
            });
        }
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
                <input className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='phone' {...register('phone')}></input>
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
    );
};

const IndexPage: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const fetcher = useSwrFetcherWithAccessToken();
    const companyDetailUri = id ? `/api/be/api/v1/company/company-detail?id=${id}` : undefined;
    const { data, mutate } = useSwr<CompanyDataResponse>(companyDetailUri, fetcher);

    function renderForm() {
        if (!id) {
            return (
                <Spin tip="Loading..." size='large'></Spin>
            );
        }

        if (typeof id !== 'string') {
            return (
                <Spin tip="Loading..." size='large'></Spin>
            );
        }

        const name = data?.name;
        if (!name || !data?.address || !data?.phone) {
            return (
                <Spin tip="Loading..." size='large'></Spin>
            );
        }

        return (
            <EditForm id={id} name={name} onEdit={() => mutate()} address={data?.address} phone={data?.phone}></EditForm>
        );
    }

    return (
        <div>
            <Title>Edit Company Data</Title>
            <Link href='/company'>Return to Index</Link>

            <h2 className='mb-5 text-3xl'>Edit Company Data</h2>
            {renderForm()}
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
