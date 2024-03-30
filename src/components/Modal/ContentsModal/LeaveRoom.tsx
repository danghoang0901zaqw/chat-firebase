import Button from '@/components/Button';
import { db } from '@/firebase/config';
import { useAuth } from '@/hooks/useAuth';
import { openRoomOptions, selectedRoomId } from '@/redux/chat/chatSlice';
import { RootState } from '@/redux/store';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '..';
interface LeaveRoomProps {
  visible: boolean;
  onCancel: () => void;
}
const LeaveRoom = ({ visible, onCancel }: LeaveRoomProps) => {
  const dispatch = useDispatch()
  const { roomId } = useSelector((state: RootState) => state.chat)
  const user = useAuth()

  const handleLeaveRoom = async () => {
    if (roomId) {
      try {
        const collectionRef = doc(db, 'rooms', roomId)
        await updateDoc(collectionRef, {
          members: arrayRemove(user?.uid)
        })
        onCancel();
        dispatch(selectedRoomId(undefined))
        dispatch(openRoomOptions(false))
        toast.success('Rời khỏi cuộc trò chuyện thành công')
        onCancel()
      } catch (error) {
        toast.error('Rời khỏi cuộc trò chuyện thất bại')
      }
    }
  }
  return (
    <Modal title="Bạn muốn rời khỏi cuộc trò chuyện ?" visible={visible} onCancel={onCancel}>
      <div className='flex flex-col gap-4'>
        <div className='mt-4 w-full flex items-center justify-center gap-2'>
          <Button className='bg-gray-100 w-full' onClick={() => onCancel()}>Huỷ</Button>
          <Button className='w-full' primary onClick={handleLeaveRoom}>Xác nhận</Button>
        </div>
      </div>
    </Modal>
  )
}

export default LeaveRoom