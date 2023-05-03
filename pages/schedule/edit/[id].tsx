import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import useSwr from 'swr';
import { z } from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/SubmitButton';
import Link from 'next/link';
import { ExamEFClient, GetGateResponse, PlaneOffsetPaginationResponse, ScheduleDataResponse } from '@/functions/swagger/examEFSwagger';
import { Select, Spin, notification } from 'antd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { useRouter } from 'next/router';


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

const EditForm: React.FC<{
    id: string,
    planeId: number,
    gateId: number,
    departure: string,
    arrival: string,
    departureDate: Date,
    arrivalDate: Date,
    distance: number
    onEdit: () => void
}> = ({ id, planeId, gateId, departure, arrival, departureDate, arrivalDate, distance, onEdit }) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            planeId: planeId,
            gateId: gateId,
            departure: departure,
            arrival: arrival,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            distance: distance
        }
    });

    async function onSubmit(data: FormDataType) {
        // console.log(data);
        try {
            const client = new ExamEFClient('http://localhost:3000/api/be');
            await client.updateSchedule(id, {
                planeId: data.planeId,
                gateId: data.gateId,
                departure: data.departure,
                arrival: data.arrival,
                departureDate: data.departureDate,
                arrivalDate: data.arrivalDate,
                distance: data.distance
            });
            reset({
                planeId: data.planeId,
                gateId: data.gateId,
                departure: data.departure,
                arrival: data.arrival,
                departureDate: data.departureDate,
                arrivalDate: data.arrivalDate,
                distance: data.distance
            });
            onEdit();
            notification.success({
                message: 'Success',
                description: 'Successfully edited schedule',
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Failed to edited schedule.',
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
    );
};

const IndexPage: Page = () => {

    const router = useRouter();
    const { id } = router.query;

    const fetcher = useSwrFetcherWithAccessToken();
    const scheduleDetailUri = id ? `/api/be/api/v1/schedule/schedule-detail?id=${id}` : undefined;
    const { data, mutate } = useSwr<ScheduleDataResponse>(scheduleDetailUri, fetcher);

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

        const name = data?.planeName;
        if (!name || !data?.companyName || !data?.gateId || !data?.departureDate || !data?.arrivalDate || !data?.gateId || !data?.planeCapacity || !data?.planeId || !data?.departure || !data?.arrival || !data?.distance) {
            return (
                <Spin tip="Loading..." size='large'></Spin>
            );
        }

        return (
            <EditForm id={id} onEdit={() => mutate()} planeId={data.planeId} gateId={data.gateId} departure={data.departure} arrival={data.arrival} departureDate={data.departureDate} arrivalDate={data.arrivalDate} distance={data.distance} ></EditForm >
        );
    }



    return (
        <div>
            <Title>Edit Schedule</Title>
            <Link href='/schedule'>Return to Index</Link>

            <h2 className='mb-5 text-3xl'>Edit Schedule</h2>
            {renderForm()}
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
