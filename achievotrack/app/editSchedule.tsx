import { View, Text } from '@/components/Themed'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import useEditScheduleStore from '@/store/useScheduleStore'
import Schedule from '@/libs/scheduleLibs';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { ScheduleType } from '@/libs/types';
import { ActivityIndicator } from 'react-native-paper';
import getSchedules from '@/utils/getSchedules';


export default function EditSchedule() {
  const { title, date, start_time, stop_time, action, id, scheduleType } = useEditScheduleStore();
  const [title_, setTitle] = useState(title);
  const [date_, setDate] = useState(date);
  const [start_time_, setStartTime] = useState(start_time);
  const [stop_time_, setStopTime] = useState(stop_time);
  const [scheduleType_, setScheduleType] = useState<{ label: ScheduleType; value: string } | null>({ label: scheduleType, value: scheduleType });
  const [visibleStartTime, setVisibleStartTime] = useState(false)
  const [visibleStopTime, setVisibleStopTime] = useState(false)
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = getSchedules();
  const scheduleTypes = [
    { label: ScheduleType.HOMEWORK, value: ScheduleType.HOMEWORK.toString() },
    { label: ScheduleType.EXAM, value: ScheduleType.EXAM.toString() },
    { label: ScheduleType.QUIZ, value: ScheduleType.QUIZ.toString() },
    { label: ScheduleType.PROJECT, value: ScheduleType.PROJECT.toString() }
  ]
  const router = useRouter();
  console.log('scheduleType: ', scheduleType)

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

  const handleSchedule = async () => {
    setIsLoading(true)
    console.log(scheduleType_?.value)
    try {
      const schedule = new Schedule(id, title_, date_, start_time_, stop_time_, scheduleType_?.value?.toLowerCase() as string, action);
      const response = await schedule.set();
      mutate();
      console.log(response);
      setIsLoading(false);
      router.back();
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value={title_} onChangeText={setTitle} style={styles.input} placeholder='Title' />
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
        <TextInput style={styles.input} onPressIn={() => setVisibleStopTime(true)} value={`${stop_time_.hours || '--'}:${stop_time_.minutes || '--'}`} />
        <TimePickerModal visible={visibleStopTime} hours={stop_time_.hours} minutes={stop_time_.minutes} onDismiss={onDismissStopTime}
          onConfirm={onConfirmStopTime} />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleSchedule()}>
          {isLoading ? <ActivityIndicator size='small' color='#fff' /> : <Text style={styles.actionTxt}>Save</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.actionBtn, backgroundColor: '#d12323' }} onPress={() => router.back()}>
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
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'white',
    fontSize: 18,
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