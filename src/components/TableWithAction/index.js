import React from 'react'
import { Table } from 'react-bootstrap'
import Tbody from '../TbodyWithAction'
import Thead from '../Thead'

function TableWithAction({
  withoutPagination,
  actionNotDisplay,
  handlePageClick,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  pages,
  customAction,
  status
}) {
  return (
    <Table striped bordered hover>
      <Thead texts={thead} />
      <Tbody 
        status={status}
        data={data}
        display={tbody}
        editUrl={editUrl}
        deleteAction={deleteAction}
        actionNotDisplay={actionNotDisplay}
        customAction={customAction}
      />
    </Table>
  )
}

export default TableWithAction