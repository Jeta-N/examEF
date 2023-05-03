import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
import { ExamEFClient, ScheduleCursorPaginationResponse, ScheduleDataResponse } from '@/functions/swagger/examEFSwagger';
import { useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Modal, notification } from 'antd';
import { format, parseISO } from 'date-fns';
import { id as indonesianTime } from 'date-fns/locale';

const ScheduleDisplayItem: React.FC<{
    schedule: ScheduleDataResponse,
    onDeleted: () => void
}> = ({ schedule, onDeleted }) => {//

    function onClickDelete() {
        Modal.confirm({
            title: `Confirm Delete`,
            content: `Delete schedule ${schedule.planeName}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                if (!schedule?.id) {
                    return;
                }

                try {
                    const client = new ExamEFClient('http://localhost:3000/api/be');
                    await client.deleteSchedule(schedule.id);
                    onDeleted();
                    notification.success({
                        message: 'Success',
                        description: 'Successfully deleted schedule data',
                        placement: 'bottomRight',
                    });
                } catch (err) {
                    console.error(err);
                    notification.error({
                        message: 'Error',
                        description: 'Failed to delete schedule.',
                        placement: 'bottomRight',
                    });
                }
            },
        });
    }

    function formatDateTime(date) {
        const dt = date?.toString(); // ini kan string...
        if (!dt) {
            return;
        }

        const isoDate = parseISO(dt);
        return format(isoDate, 'd MMM yyy HH:mm:ss', {
            locale: indonesianTime
        });
    }

    return (
        <tr>
            <td className="border px-4 py-2">{schedule.planeName}</td>
            <td className="border px-4 py-2">{schedule.companyName}</td>
            <td className="border px-4 py-2">{schedule.planeCapacity}</td>
            <td className="border px-4 py-2">{formatDateTime(schedule.departureDate)}</td>
            <td className="border px-4 py-2">{formatDateTime(schedule.arrivalDate)}</td>
            <td className="border px-4 py-2">{schedule.gateName}</td>
            <td className='border px-4 py-2'>
                <Link href={`/schedule/edit/${schedule.id}`} className="inline-block py-1 px-2 text-xs bg-blue-500 text-white rounded-lg">
                    <FontAwesomeIcon className='mr-1' icon={faEdit}></FontAwesomeIcon>
                    Edit
                </Link>
                <button onClick={onClickDelete} className="ml-1 py-1 px-2 text-xs bg-red-500 text-white rounded-lg">
                    <FontAwesomeIcon className='mr-1' icon={faRemove}></FontAwesomeIcon>
                    Delete
                </button>
            </td>
        </tr>
    );
};

const IndexPage: Page = () => {
    const [url, setUrl] = useState("api/v1/schedule/schedule-list?limit=3");
    const fetcher = useSwrFetcherWithAccessToken();

    const { data, mutate } = useSwr<ScheduleCursorPaginationResponse>(`/api/be/${url}`, fetcher);


    return (
        <div>
            <Title>Home</Title>
            <h1 className='font-bold text-5xl my-3'>Schedule</h1>
            <div>
                <Link href='/schedule/create' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 rounded inline-block'>
                    <FontAwesomeIcon icon={faPlus} className='mr-2'></FontAwesomeIcon>
                    Create new Schedule
                </Link>
            </div>
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='border px-4 py-2'>Plane Name</th>
                        <th className='border px-4 py-2'>Company Name</th>
                        <th className='border px-4 py-2'>Plane Capacity</th>
                        <th className='border px-4 py-2'>Departure Date</th>
                        <th className='border px-4 py-2'>Arrival Date</th>
                        <th className='border px-4 py-2'>Gate Name</th>
                        <th className='border px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.schedules?.map((x, i) => <ScheduleDisplayItem key={i} schedule={x} onDeleted={() => mutate()}></ScheduleDisplayItem>)}
                </tbody>
            </table>

            <button onClick={() => setUrl(data?.prevCursor != null ? data?.prevCursor : "")} type='button' className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Prev</button>
            <button onClick={() => setUrl(data?.nextCursor != null ? data?.nextCursor : "")} type='button' className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
