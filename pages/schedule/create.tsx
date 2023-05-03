import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import useSwr from 'swr';
import { z } from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/SubmitButton';
import Link from 'next/link';
import { ExamEFClient, GetGateResponse,  PlaneOffsetPaginationResponse } from '@/functions/swagger/examEFSwagger';
import { Select, notification } from 'antd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';


const FormSchema = z.object({
    planeId: z.number({
        required_error: 'Plane Name tidak boleh kosong'
    }),
    gateId: z.number({
        required_error: 'Gate tidak boleh kosong'
    }),
    departure: z.string().nonempty({
        message: 'Departure tidak boleh kosong'
    }).max(100, "Departure maksimal 100 huruf"),
    arrival: z.string().nonempty({
        message: 'Arrival tidak boleh kosong'
    }).max(100, "Arrival maksimal 100 huruf"),
    departureDate: z.date({
        required_error: "Departure date tidak boleh kosong",
        invalid_type_error: "Departure date harus format tanggal",
    }),//minimum h+7 kurang waktu, harusnya bisa pake min
    arrivalDate: z.date({
        required_error: "Arrival date tidak boleh kosong",
        invalid_type_error: "Arrival date harus format tanggal",
    }),//minimum h+7 kurang waktu, harusnya bisa pake min
    distance: z.number({
        required_error: 'Distance tidak boleh kosong',
        invalid_type_error: 'Distance harus angka'
    }).min(1, "Distance minimal 1")
        .max(30000, "Distance maximal 30000") //kurang tau yang fuel,
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
            await client.registerSchedule({
                planeId: data.planeId,
                gateId: data.gateId,
                arrival: data.arrival,
                departure: data.departure,
                departureDate: data.departureDate,
                arrivalDate: data.arrivalDate,
                distance: data.distance
            });
            reset();
            notification.success({
                message: 'Success',
                description: 'Successfully created schedule',
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Failed to created schedule.',
                placement: 'bottomRight',
            });
        }
    }

    const fetcher = useSwrFetcherWithAccessToken();
    const { data: gates } = useSwr<GetGateResponse[]>(`/api/be/api/v1/gate/`, fetcher);
    const { data: planeName } = useSwr<PlaneOffsetPaginationResponse>(`/api/be/api/v1/plane/plane-list?Limit=999`, fetcher);

    const optionsGates = gates?.map(Q => {
        return {
            label: Q.name,
            value: Q.id
        };
    }) ?? [];

    const optionsPlaneName = planeName?.planes?.map(Q => {
        return {
            label: Q.name,
            value: Q.id
        };
    }) ?? [];

    return (
        <div>
            <Title>Create New Schedule</Title>
            <Link href='/schedule'>Return to Index</Link>

            <h2 className='mb-5 text-3xl'>Create New Schedule</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='companyName'>Company Name</label>
                    <input className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='companyName'></input>
                    {/* <p className='text-red-500'>{errors['companyName']?.message}</p> */}
                </div>
                {/* Searchnya belom dibikin waktu ga cukup */}
                <div>
                    <label htmlFor='planeId'>Plane Name</label>
                    <Controller
                        control={control}
                        name='planeId'
                        render={({ field }) => (
                            <Select
                                className='block w-full'
                                defaultValue="Choose Plane"
                                {...field}
                                options={optionsPlaneName}
                            />
                        )}
                    ></Controller>
                    <p className='text-red-500'>{errors['planeId']?.message}</p>
                </div>
                <div>
                    <label htmlFor='gateId'>Gate</label>
                    <Controller
                        control={control}
                        name='gateId'
                        render={({ field }) => (
                            <Select
                                className='block w-full'
                                defaultValue="Choose Gate"
                                {...field}
                                options={optionsGates}
                            />
                        )}
                    ></Controller>
                    <p className='text-red-500'>{errors['gateId']?.message}</p>
                </div>
                <div>
                    <label htmlFor='departure'>Departure</label>
                    <input type="text" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='departure' {...register('departure')}></input>
                    <p className='text-red-500'>{errors['departure']?.message}</p>
                </div>
                <div>
                    <label htmlFor='arrival'>Arrival</label>
                    <input type="text" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='arrival' {...register('arrival')}></input>
                    <p className='text-red-500'>{errors['arrival']?.message}</p>
                </div>
                <div>
                    <label htmlFor='departureDate'>Departure Date</label>
                    <input type="date" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='departureDate' {...register('departureDate', { valueAsDate: true })}></input>
                    <p className='text-red-500'>{errors['departureDate']?.message}</p>
                </div>
                <div>
                    <label htmlFor='arrivalDate'>Arrival Date</label>
                    <input type="date" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='arrivalDate' {...register('arrivalDate', { valueAsDate: true })}></input>
                    <p className='text-red-500'>{errors['arrivalDate']?.message}</p>
                </div>
                <div>
                    <label htmlFor='distance'>Distance</label>
                    <input type="number" className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='distance' {...register('distance', { valueAsNumber: true })}></input>
                    <p className='text-red-500'>{errors['distance']?.message}</p>
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
