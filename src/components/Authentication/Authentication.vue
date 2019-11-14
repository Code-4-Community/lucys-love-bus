<template>
    <div>
       <router-view>
         <h4 slot="login-header"> Welcome! </h4>
         <p slot="login-description"> A very detailed login description </p>
         <strong slot="login-prompt"> Sign in to your account </strong>

         <h4 slot="sign-up-header"> Join the Sajni Center Community! </h4>
         <p slot="sign-up-description"> A very detailed signup description </p>
         <strong slot="sign-up-prompt"> Sign up for a family account </strong>
       </router-view>
    </div>
</template>

<style>
</style>
