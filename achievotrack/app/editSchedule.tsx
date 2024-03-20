import { View, Text } from '@/components/Themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import useScheduleStore from '@/store/useScheduleStore'
import Schedule from '@/libs/scheduleLibs';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { Course, ScheduleType } from '@/libs/types';
import { ActivityIndicator } from 'react-native-paper';
import getSchedules from '@/utils/getSchedules';
import getCourses from '@/utils/getCourses';


export default function EditSchedule() {
  const { data } = getCourses();
  const courses = data?.map((course: Course) => ({ label: course.course.name, value: course.id }))
  const [course, setCourse] = useState<{ label: string, value: string } | null>(courses[0])
  const { title, date, start_time, stop_time, action, id, scheduleType } = useScheduleStore();
  const [task, setTask] = useState(title);
  const [date_, setDate] = useState(date);
  const [start_time_, setStartTime] = useState(start_time);
  const [stop_time_, setStopTime] = useState(stop_time);
  const [scheduleType_, setScheduleType] = useState<{ label: ScheduleType; value: string } | null>({ label: scheduleType, value: scheduleType });
  const [visibleStartTime, setVisibleStartTime] = useState(false)
  const [visibleStopTime, setVisibleStopTime] = useState(false)
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const { mutate } = getSchedules();
  const scheduleTypes = [
    { label: ScheduleType.HOMEWORK, value: ScheduleType.HOMEWORK.toString() },
    { label: ScheduleType.EXAM, value: ScheduleType.EXAM.toString() },
    { label: ScheduleType.QUIZ, value: ScheduleType.QUIZ.toString() },
    { label: ScheduleType.PROJECT, value: ScheduleType.PROJECT.toString() }
  ]
  const router = useRouter();
  const onDismissStartTime = React.useCallback(() => {
    setVisibleStartTime(false)
  }, [setVisibleStartTime])

  const onConfirmStartTime = React.useCallback(
    ({ hours, minutes }: { hours: number, minutes: number }) => {
      setVisibleStartTime(false);
      setStartTime({ hours, minutes })
    },
    [setVisibleStartTime]
  );

  const onDismissStopTime = React.useCallback(() => {
    setVisibleStopTime(false)
  }, [setVisibleStopTime])

  const onConfirmStopTime = React.useCallback(
    ({ hours, minutes }: { hours: number, minutes: number }) => {
      setVisibleStopTime(false);
      setStopTime({ hours, minutes })
    },
    [setVisibleStopTime]
  );

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
  console.log("the action is :", action)
  const handleSchedule = async () => {
    if (!task || !start_time_ || !stop_time_ || !course) return setErr('Missing fields')
    setIsLoading(true)
    try {
      const schedule = new Schedule(id, task, date_, start_time_, stop_time_, scheduleType_?.value?.toLowerCase() as string, course?.value as string, action);
      await schedule.set();
      mutate();
      setIsLoading(false);
      router.back();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErr('Something went wrong');
    }
  };

  useEffect(() => {
    if (err) {
      setTimeout(() => {
        setErr('');
      }, 3000)
    }
  }, [err])

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value={task} onChangeText={setTask} style={styles.input} placeholder='Task' />
      </View>
      <View style={styles.inputContainer}>
        <Dropdown
          data={courses}
          placeholder='Course'
          value={course}
          style={{ ...styles.input, paddingVertical: 16 }}
          onChange={(item) => setCourse({ label: item.label, value: item.value })}
          labelField={'label'}
          valueField={'label'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Dropdown
          data={scheduleTypes}
          placeholder='Schedule Type'
          value={scheduleType_}
          style={{ ...styles.input, paddingVertical: 16 }}
          onChange={(item) => setScheduleType({ label: item.label, value: item.value })}
          labelField={'label'}
          valueField={'label'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onPressIn={() => setOpen(true)} value={new Date(date_).toDateString()} placeholder='Date' />
        <DatePickerModal visible={open} date={new Date(date_)} mode='single' locale='en' onDismiss={onDismissSingle}
          onConfirm={onConfirmSingle} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onPressIn={() => setVisibleStartTime(true)} value={`${start_time_.hours || 'Start'}${start_time_.hours ? ':' : ' '}${start_time_.minutes || 'Time'}`} placeholder='Start Time' />
        <TimePickerModal visible={visibleStartTime} hours={start_time_.hours} minutes={start_time_.minutes} onDismiss={onDismissStartTime}
          onConfirm={onConfirmStartTime} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onPressIn={() => setVisibleStopTime(true)} value={`${stop_time_.hours || 'Stop'}${stop_time_.hours ? ':' : ' '}${stop_time_.minutes || 'Time'}`} />
        <TimePickerModal visible={visibleStopTime} hours={stop_time_.hours} minutes={stop_time_.minutes} onDismiss={onDismissStopTime}
          onConfirm={onConfirmStopTime} />
      </View>
      {err.length > 0 && <Text style={{ color: 'red', fontSize: 14 }}>{err}</Text>}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.back()}>
          <Text style={styles.actionTxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.actionBtn, backgroundColor: '#d12323' }} onPress={() => handleSchedule()}>
          {isLoading ? <ActivityIndicator size='small' color='#fff' /> : <Text style={styles.actionTxt}>Save</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    flexDirection: 'column',
    paddingVertical: 20
  },
  inputContainer: {
    width: '90%',
  },
  label: {
    marginBottom: 7,
    fontSize: 16,
    opacity: 0.8
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%'
  },
  actionBtn: {
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 35,
    backgroundColor: '#848383',
    minWidth: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionTxt: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  }
});
