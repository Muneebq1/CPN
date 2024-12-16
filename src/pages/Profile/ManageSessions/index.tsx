import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SessionData } from '@/@types/manageSessions';
import Loader from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { strings } from '@/locales';
import { clearUser } from '@/redux/slices/auth';
import { PUBLIC_ROUTES } from '@/routes';
import { deleteSession, getAllSessions } from '@/services/sessionsService';
import { clearAS } from '@/utils/localStorage';

import SessionCard from './SessionCard';
import SessionModal from './SessionModal';

const ManageSessions = () => {
  const dispatch = useAppDispatch();
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    null,
  );
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const { access_token } = useAppSelector((state) => {
    return {
      access_token: state?.auth?.user?.access_token,
    };
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      const response = await getAllSessions();
      if (response) {
        setSessions(response);
      }
      setLoading(false);
    };

    fetchSessions();
  }, []);

  const handleDeleteSession = useCallback(
    async (item: SessionData) => {
      setDeleteLoading(true);
      const success = await deleteSession({ type: 'delete', id: item?.id });
      if (success) {
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session.id !== item?.id),
        );
      }

      if (item.session_id === access_token) {
        clearAS();
        dispatch(clearUser());
        navigate(PUBLIC_ROUTES.SIGNIN);
      }
      setDeleteLoading(false);
    },
    [sessions, access_token, dispatch, navigate],
  );

  const handleDeleteAllSessions = useCallback(async () => {
    setDeleteLoading(true);
    await Promise.all(
      sessions.map((session) =>
        deleteSession({ type: 'delete', id: session.id }),
      ),
    );
    setSessions([]);
    setDeleteLoading(false);
    clearAS();
    dispatch(clearUser());
    navigate(PUBLIC_ROUTES.SIGNIN);
  }, [sessions, dispatch, navigate]);

  const openDeleteModal = (session: SessionData | null, deleteAll = false) => {
    setSelectedSession(session);
    setIsDeleteAll(deleteAll);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedSession(null);
    setIsDeleteAll(false);
  };

  const handleModalOk = () => {
    if (isDeleteAll) {
      handleDeleteAllSessions();
    } else if (selectedSession) {
      handleDeleteSession(selectedSession);
    }
    closeDeleteModal();
  };

  if (loading)
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Loader />
      </div>
    );

  return (
    <div className='container'>
      <Typography variant='title' className='mb-5'>
        {strings.Profile.manageSessions}
      </Typography>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            item={session}
            onDeleteSession={() => openDeleteModal(session)}
          />
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <Button
          onClick={() => openDeleteModal(null, true)}
          className='bg-subscriptionRed rounded-full text-xl font-medium h-14 w-fit px-10'
          loading={deleteLoading}
        >
          {strings.ManageSession.logoutFromSessions}
        </Button>
      </div>

      {showModal && (
        <SessionModal
          message={
            isDeleteAll
              ? strings.ManageSession.deleteAllSession
              : strings.ManageSession.deleteSession
          }
          onOk={handleModalOk}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default ManageSessions;
