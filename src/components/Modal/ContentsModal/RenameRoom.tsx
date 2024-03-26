import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { db } from '@/firebase/config';
import useApp from '@/hooks/useApp';
import { RootState } from '@/redux/store';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface RenameRoomProps {
  visible: boolean;
  onCancel: () => void;
}
const RenameRoom = ({ visible, onCancel }: RenameRoomProps) => {
  const { roomActive } = useApp()
  const { roomId } = useSelector((state: RootState) => state.chat)
  const [roomName, setRoomName] = useState<string>(roomActive?.roomName ?? '')

  const handleUpdateRoomName = async () => {
    if (roomId) {
      try {
        const collectionRef = doc(db, 'rooms', roomId)
        await updateDoc(collectionRef, {
          roomName
        })
        toast.success('Đổi tên cuộc trò chuyện thành công')
        onCancel()
      } catch (error) {
        toast.error('Đổi tên cuộc trò chuyện thất bại')
      }
    }

  }

  return (
    <Modal title="Đổi tên cuộc trò chuyện" visible={visible} onCancel={onCancel}>
      <div className='flex flex-col gap-4'>
        <Input
          value={roomName}
          onChange={(value) => setRoomName(value)}
          type="text"
          placeholder="Tên đăng nhập"
          className='font-medium'
        />
        <div className='mt-4 w-full flex items-center justify-center gap-2'>
          <Button className='bg-gray-100 w-full' onClick={() => onCancel()}>Huỷ</Button>
          <Button className='w-full' primary onClick={handleUpdateRoomName}>Lưu</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameRoom;
