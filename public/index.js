(async () => {

  const registration = await navigator.serviceWorker.ready
  if ('periodicSync' in registration) {
    const status = await navigator.permissions.query({
      name: 'periodic-background-sync'
    })

    if (status.state === 'granted') {
      try {
        await registration.periodicSync.register('todos', {
          minInterval: 6 * 60 * 60 * 100
        })
        console.log('Periodic Background Sync Registered')
      } catch (e) {
        console.log('Periodic Background Sync registration failed', e)
      }
    } else console.log('Periodic Sync permissions are not granted')
  } else console.log('Periodic Sync is not supported')

})()
