import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
import { PlaneDataResponse, PlaneOffsetPaginationResponse, ExamEFClient } from '@/functions/swagger/examEFSwagger';
import { useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Modal, notification } from 'antd';

const PlaneDisplayItem: React.FC<{
    plane: PlaneDataResponse,
    onDeleted: () => void
}> = ({ plane, onDeleted }) => {//

    function onClickDelete() {
        Modal.confirm({
            title: `Confirm Delete`,
            content: `Delete plane ${plane.name}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                if (!plane?.id) {
                    return;
                }

                try {
                    const client = new ExamEFClient('http://localhost:3000/api/be');
                    await client.deletePlane(plane.id);
                    onDeleted();
                    notification.success({
                        message: 'Success',
                        description: 'Successfully deleted plane data',
                        placement: 'bottomRight',
                    });
                } catch (err) {
                    console.error(err);
                    notification.error({
                        message: 'Error',
                        description: 'Failed to delete plane. It\'s possible the plane still has/have flight schedule(s).',
                        placement: 'bottomRight',
                    });
                }
            },
        });
    }

    return (
        <tr>
            <td className="border px-4 py-2">{plane.name}</td>
            <td className="border px-4 py-2">{plane.companyAddress}</td>
            <td className="border px-4 py-2">{plane.type}</td>
            <td className="border px-4 py-2">{plane.capacity}</td>
            <td className="border px-4 py-2">{plane.fuelCapacity}</td>
            <td className='border px-4 py-2'>
                <Link href={`/plane/edit/${plane.id}`} className="inline-block py-1 px-2 text-xs bg-blue-500 text-white rounded-lg">
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
    const [pageIndex, setPageIndex] = useState(0);
    const fetcher = useSwrFetcherWithAccessToken();

    const { data, mutate } = useSwr<PlaneOffsetPaginationResponse>(`/api/be/api/v1/plane/plane-list?limit=3&offset=${pageIndex}`, fetcher);


    return (
        <div>
            <Title>Home</Title>
            <h1 className='font-bold text-5xl my-3'>Plane</h1>
            <div>
                <Link href='/plane/create' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 rounded inline-block'>
                    <FontAwesomeIcon icon={faPlus} className='mr-2'></FontAwesomeIcon>
                    Create new Plane
                </Link>
            </div>
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='border px-4 py-2'>Plane Name</th>
                        <th className='border px-4 py-2'>Plane Address</th>
                        <th className='border px-4 py-2'>Plane Type</th>
                        <th className='border px-4 py-2'>Plane Capacity</th>
                        <th className='border px-4 py-2'>Plane Fuel Capacity</th>
                        <th className='border px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.planes?.map((x, i) => <PlaneDisplayItem key={i} plane={x} onDeleted={() => mutate()}></PlaneDisplayItem>)}
                </tbody>
            </table>

            <button onClick={() => setPageIndex(pageIndex - 1)} type='button' className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Prev</button>
            <button onClick={() => setPageIndex(pageIndex + 1)} type='button' className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
