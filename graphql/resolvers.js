import db_query from "../services/connection"
import { startOfWeek, endOfWeek, format } from "date-fns";

const date_regex = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):00:00$/;
const resolvers = {
    Query: {
        reservations: async () => {
            const start_date = format(startOfWeek(new Date(),{weekStartsOn:1}), 'YYYY-MM-DD HH:mm:ss');
            const end_date = format(endOfWeek(new Date(),{weekStartsOn:1}), 'YYYY-MM-DD HH:mm:ss');
            
            return db_query(`SELECT r.*, u.department, m.room_name
                             FROM reservation r
                             JOIN user u ON r.user_id = u.user_id
                             JOIN meeting_room m ON r.room_id = m.room_id
                             WHERE r.reservation_time BETWEEN '${start_date}' AND '${end_date}'`);
        },
        getVacantRoom: async (_, params) => {
            try {
                const time = params.time;

                if (!date_regex.test(reservation_time)) {
                    throw 'failure : invalid time';
                }

                return await db_query(`SELECT *
                                       FROM meeting_room
                                       WHERE room_id NOT IN (SELECT room_id FROM reservation WHERE reservation_time = '${reservation_time}')`)    
            } catch (err) {
                throw err;
            }
            
        }
    },
    Mutation: {
        makeReservation: async (_, params) => {
            try {
                const { user_id, room_id, reservation_time } = params;

                if (!date_regex.test(reservation_time)) {
                    throw 'failure : invalid time';
                }

                await db_query(`INSERT INTO reservation(user_id, room_id, reservation_time) VALUE (${user_id}, ${room_id}, '${reservation_time}')`);

                return 'success';

            } catch (err) {
                if (/Duplicate entry/.test(err)) {
                    throw 'failure : duplicated reservation';
                }

                throw err;
            }
        }
    }
};

export default resolvers;