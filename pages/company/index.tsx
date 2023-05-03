import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
import { CompanyDataResponse, CompanyOffsetPaginationResponse, ExamEFClient } from '@/functions/swagger/examEFSwagger';
import { useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Modal, notification } from 'antd';

const CompanyDisplayItem: React.FC<{
    company: CompanyDataResponse,
    onDeleted: () => void
}> = ({ company, onDeleted }) => {//

    function onClickDelete() {
        Modal.confirm({
            title: `Confirm Delete`,
            content: `Delete company ${company.name}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                if (!company?.id) {
                    return;
                }

                try {
                    const client = new ExamEFClient('http://localhost:3000/api/be');
                    await client.deleteCompany(company.id);
                    await client.blobDELETE(company.blobId)
                    onDeleted();
                    notification.success({
                        message: 'Success',
                        description: 'Successfully deleted company data',
                        placement: 'bottomRight',
                    });
                } catch (err) {
                    console.error(err);
                    notification.error({
                        message: 'Error',
                        description: 'Failed to delete company. It\'s possible the company still has/have flight schedule(s).',
                        placement: 'bottomRight',
                    });
                }
            },
        });
    }

    return (
        <tr>
            <td className="border px-4 py-2">{company.name}</td>
            <td className="border px-4 py-2">{company.address}</td>
            <td className="border px-4 py-2">{company.phone}</td>
            <td className="border px-4 py-2">
                <img src={company.fileUrl} alt="profile Picture" className='w-[300px] h-[150px]' />
            </td>
            <td className='border px-4 py-2'>
                <Link href={`/company/edit/${company.id}`} className="inline-block py-1 px-2 text-xs bg-blue-500 text-white rounded-lg">
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

    const { data, mutate } = useSwr<CompanyOffsetPaginationResponse>(`/api/be/api/v1/company/company-list?limit=3&offset=${pageIndex}`, fetcher);
    

    return (
        <div>
            <Title>Home</Title>
            <h1 className='font-bold text-5xl my-3'>Company</h1>
            <div>
                <Link href='/company/create' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 rounded inline-block'>
                    <FontAwesomeIcon icon={faPlus} className='mr-2'></FontAwesomeIcon>
                    Create new Company
                </Link>
            </div>
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='border px-4 py-2'>Name</th>
                        <th className='border px-4 py-2'>Address</th>
                        <th className='border px-4 py-2'>Phone Number</th>
                        <th className='border px-4 py-2'>Logo</th>
                        <th className='border px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.companies?.map((x, i) => <CompanyDisplayItem key={i} company={x} onDeleted={() => mutate()}></CompanyDisplayItem>)}
                </tbody>
            </table>

            <button onClick={() => setPageIndex(pageIndex - 1)} type='button' className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Prev</button>
            <button onClick={() => setPageIndex(pageIndex + 1)} type='button' className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
