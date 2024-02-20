import { View, Text } from '@/components/Themed'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import useEditScheduleStore from '@/store/editScheduleStore'
import Schedule from '@/libs/scheduleLibs';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { ScheduleType } from '@/libs/types';


export default function EditSchedule() {
  const { title, date, start_time, stop_time, scheduleType, action } = useEditScheduleStore();
  const [title_, setTitle] = useState(title);
  const [date_, setDate] = useState(date)
  const [start_time_, setStartTime] = useState(start_time);
  const [stop_time_, setStopTime] = useState(stop_time);
  const [scheduleType_, setScheduleType] = useState<{ label: ScheduleType; value: string }>({ label: ScheduleType.HOMEWORK, value: '' });
  const [visibleStartTime, setVisibleStartTime] = useState(false)
  const [visibleStopTime, setVisibleStopTime] = useState(false)
  const [open, setOpen] = useState(false);
  const scheduleTypes = [
    { label: ScheduleType.HOMEWORK, value: ScheduleType.HOMEWORK.toString()},
    { label: ScheduleType.EXAM, value: ScheduleType.EXAM.toString()},
    { label: ScheduleType.QUIZ, value: ScheduleType.QUIZ.toString()},
    { label: ScheduleType.PROJECT, value: ScheduleType.PROJECT.toString()}
  ]
  const router = useRouter();

  const onDismissStartTime = React.useCallback(() => {
    setVisibleStartTime(false)
  }, [setVisibleStartTime])

  const onConfirmStartTime = React.useCallback(
    ({ hours, minutes }: {hours: number, minutes: number}) => {
      setVisibleStartTime(false);
      setStartTime({hours, minutes})
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

  const handleSchedule = async () => {
    const schedule = new Schedule(title_, date_, start_time_, stop_time_, scheduleType_.value, action);
    const response = await schedule.set();
    console.log(response)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput value={title_} onChangeText={setTitle} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Schedule Type</Text>
        <Dropdown
          data={scheduleTypes}
          placeholder='Homework'
          value={scheduleType_}
          style={{ ...styles.input, paddingVertical: 8 }}
          onChange={(item) => setScheduleType(item)} 
          labelField={'label'} 
          valueField={'label'} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} onPressIn={() => setOpen(true)} value={new Date(date_).toDateString()} />
        <DatePickerModal visible={open} date={new Date(date_)} mode='single' locale='en' onDismiss={onDismissSingle}
          onConfirm={onConfirmSingle} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Time</Text>
        <TextInput style={styles.input} onPressIn={() => setVisibleStartTime(true)} value={`${start_time_.hours || '--'}:${start_time_.minutes || '--'}`} />
        <TimePickerModal locale='en' visible={visibleStartTime} hours={start_time_.hours} minutes={start_time_.minutes} onDismiss={onDismissStartTime}
          onConfirm={onConfirmStartTime} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Stop Time</Text>
        <TextInput style={styles.input} onPressIn={() => setVisibleStopTime(true)} value={`${stop_time_.hours || '--'}:${stop_time_.minutes || '--'}`} />
        <TimePickerModal visible={visibleStopTime} hours={stop_time_.hours} minutes={stop_time_.minutes} onDismiss={onDismissStopTime}
          onConfirm={onConfirmStopTime} />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleSchedule()}>
          <Text style={styles.actionTxt}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.back()}>
          <Text style={styles.actionTxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 13,
    borderRadius: 20,
    backgroundColor: 'white',
    fontSize: 16,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#d12323',
  },
  actionTxt: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  }
});
