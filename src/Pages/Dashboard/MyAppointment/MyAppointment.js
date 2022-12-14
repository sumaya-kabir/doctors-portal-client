import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
        });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h2 className='text-3xl font-semibold my-6'>My Appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) =>
                            <tr key={booking._id} className="hover">
                            <th>{i + 1}</th>
                            <td>{booking.patientName}</td>
                            <td>{booking.treatment}</td>
                            <td>{booking.appointmentDate}</td>
                            <td>{booking.slot}</td>
                            <td>
                                {
                                    booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                    <button className='btn btn-sm btn-accent'>Pay</button></Link>
                                }
                                {
                                    booking.price && booking.paid && <button className='text-primary btn btn-outline btn-sm'>Paid</button>
                                }
                            </td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;