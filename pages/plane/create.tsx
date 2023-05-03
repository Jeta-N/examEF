import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import useSwr from 'swr';
import { z } from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/SubmitButton';
import Link from 'next/link';
import { CompanyOffsetPaginationResponse, ExamEFClient, GetPlaneTypeResponse } from '@/functions/swagger/examEFSwagger';
import { Select, notification } from 'antd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';


const FormSchema = z.object({
    name: z.string().nonempty({
        message: 'Nama tidak boleh kosong'
    }).max(100, "Nama tidak boleh lebih dari 100 huruf"),
    companyId: z.number({
        required_error: 'Company tidak boleh kosong'
    }),
    planeTypeId: z.number({
        required_error: "Plane Type tidak boleh kosong"
    }),
    capacity: z.number({
        invalid_type_error: 'Capacity tidak boleh kosong dan harus angka'
    }).min(1, "Capacity Harus lebih besar dari 0")
        .max(1000, "Capacity tidak boleh lebih dari 1000"),
    fuelCapacity: z.number({
        invalid_type_error: 'Fuel Capacity tidak boleh kosong dan harus angka'
    }).min(1, "Fuel Capacity Harus lebih besar dari 0")
        .max(30000, "Fuel Capacity tidak boleh lebih dari 30000"),
});

type FormDataType = z.infer<typeof FormSchema>;

const IndexPage: Page = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema)
    });

    async function onSubmit(data: FormDataType) {
        // console.log(data);

        try {
            const client = new ExamEFClient('http://localhost:3000/api/be');
            await client.registerPlane({
                name: data.name,
                companyId: data.companyId,
                capacity: data.capacity,
                fuelCapacity: data.fuelCapacity,
                planeTypeId: data.planeTypeId,
            });
            reset();
            notification.success({
                message: 'Success',
                description: 'Successfully created plane',
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Failed to created plane. It\'s possible the plane name is already registered',
                placement: 'bottomRight',
            });
        }
    }

    const fetcher = useSwrFetcherWithAccessToken();
    const { data: companies } = useSwr<CompanyOffsetPaginationResponse>(`/api/be/api/v1/company/company-list?limit=999&offset=0`, fetcher);
    const { data: planeTypes } = useSwr<GetPlaneTypeResponse[]>(`/api/be/api/v1/plane-type/`, fetcher);

    const optionsCompany = companies?.companies?.map(Q => {
        return {
            label: Q.name,
            value: Q.id
        };
    }) ?? [];

    const optionsPlaneType = planeTypes?.map(Q => {
        return {
            label: Q.name,
            value: Q.id
        };
    }) ?? [];

    return (
        <div>
            <Title>Create New Plane</Title>
            <Link href='/plane'>Return to Index</Link>

            <h2 className='mb-5 text-3xl'>Create New Plane</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Plane Name</label>
                    <input className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='name' {...register('name')}></input>
                    <p className='text-red-500'>{errors['name']?.message}</p>
                </div>
                <div>
                    <label htmlFor='address'>Company Address</label>
                    <Controller
                        control={control}
                        name='companyId'
                        render={({ field }) => (
                            <Select
                                className='block w-full'
                                defaultValue="Company Name"
                                {...field}
                                options={optionsCompany}
                            />
                        )}
                    ></Controller>
                    <p className='text-red-500'>{errors['companyId']?.message}</p>
                </div>
                <div>
                    <label htmlFor='planeTypeId'>Plane Type</label>
                    <Controller
                        control={control}
                        name='planeTypeId'
                        render={({ field }) => (
                            <Select
                                className='block w-full'
                                defaultValue="Plane Type"
                                {...field}
                                options={optionsPlaneType}
                            />
                        )}
                    ></Controller>
                    <p className='text-red-500'>{errors['planeTypeId']?.message}</p>
                </div>
                <div>
                    <label htmlFor='capacity'>Plane Capacity</label>
                    <input type="number" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='capacity' {...register('capacity', { valueAsNumber: true })}></input>
                    <p className='text-red-500'>{errors['capacity']?.message}</p>
                </div>
                <div>
                    <label htmlFor='fuelCapacity'>Plane Fuel Capacity</label>
                    <input type="number" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='fuelCapacity' {...register('fuelCapacity', { valueAsNumber: true })}></input>
                    <p className='text-red-500'>{errors['fuelCapacity']?.message}</p>
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
