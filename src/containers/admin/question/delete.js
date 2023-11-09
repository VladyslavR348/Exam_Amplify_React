import React, {useEffect, useState} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import {useStyles} from '../../style/common'
import {useAsync} from '../../../functions/utils'
import {remove} from '../../../api/question'
import {remove as removeParagraph} from '../../../api/paragraph'
import DeleteConfirm from '../../../components/DeleteConfirm'

const Delete = (props) => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const {children, item, refresh} = props
  const classes = useStyles()
  const [pending, setPending] = useState(false)
  const [acitiveConfirm, setActiveConfirm] = useState(false)

  const handleDelete = () => {
    setActiveConfirm(true)
  }
  const deleteConfirm = (res) => {
    setActiveConfirm(false)
    if (res) {
      if (item.type === 'PARAGRAPH') {
        run(removeParagraph(item.id))
      }
      else
        run(remove(item.id))
      setPending(true)
    }
  }

  useEffect(() => {
    if (status === 'resolved') {
      refresh()
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status, run])
  return (
    <>
      <DeleteConfirm open={acitiveConfirm} callback={deleteConfirm} />
      <div style={{cursor: 'pointer'}} onClick={handleDelete}>
        {children}
      </div>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  )
}
export default Delete
