import TimelineUnit from './TimelineUnit';
import { useDispatch, useSelector } from 'react-redux';
import { getContactInteractions } from '../store/interactions';

const Timeline = ({contact}) => {

  const dispatch = useDispatch();
  const interactions = useSelector(getContactInteractions(contact.id));

  const firstConnectionEventInfo = {
    contactMethod: `First connected with ${contact.name}`,
    dateContacted: contact.dateConnected? contact.dateConnected : contact.createdAt
  }

  const sortEvents = (events) => {
    return events.sort((a, b) => {
      return new Date(a.dateContacted) - new Date(b.dateContacted);
    })
  }

  // TODO: make scrollable

  return (
    <div className='bg-pale-green p-2 rounded'>
      <div className='bg-white rounded dropshadow p-2'>
        <div className="border-solid border-green-900 border-b-2 mb-6">
          <p className='text-lg'>Timeline</p>
        </div>
        <div className='overflow-auto'>
          <TimelineUnit eventInfo={firstConnectionEventInfo}/>
          {sortEvents(interactions).map(interaction => <TimelineUnit key={interaction.id} eventInfo={interaction}/>)}
        </div>
      </div>
    </div>
    
  )

}

export default Timeline;