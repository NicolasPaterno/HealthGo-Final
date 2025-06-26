"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { BellIcon, CheckIcon, LockIcon, SunIcon, UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/theme-provider" // Importa o useTheme

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  urls: z.object({
    twitter: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
    github: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
    linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  }),
})

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["default", "comfortable", "compact"], {
    required_error: "Please select a font size.",
  }),
})

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(false).optional(),
  pushNotifications: z.boolean().default(false).optional(),
  newProposals: z.boolean().default(false).optional(),
  newComments: z.boolean().default(false).optional(),
  mentions: z.boolean().default(false).optional(),
  documentUpdates: z.boolean().default(false).optional(),
})

const securityFormSchema = z.object({
  twoFactorAuth: z.boolean().default(false).optional(),
  passwordChangeInterval: z.enum(["never", "30days", "60days", "90days"], {
    required_error: "Please select a password change interval.",
  }),
  sessionTimeout: z.enum(["15min", "30min", "1hour", "4hours", "1day"], {
    required_error: "Please select a session timeout.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>
type SecurityFormValues = z.infer<typeof securityFormSchema>

export function SettingsForm() {
  const [activeTab, setActiveTab] = React.useState("profile")
  const { setTheme } = useTheme() // Usa o hook useTheme

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "shadcn",
      email: "m@example.com",
      bio: "I'm a software developer based in the UK. I love building things with React and TypeScript.",
      urls: {
        twitter: "https://twitter.com/shadcn",
        github: "https://github.com/shadcn",
        linkedin: "https://linkedin.com/in/shadcn",
      },
    },
  })

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "default",
    },
  })

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      newProposals: true,
      newComments: true,
      mentions: true,
      documentUpdates: false,
    },
  })

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      passwordChangeInterval: "never",
      sessionTimeout: "30min",
    },
  })

  function onProfileSubmit(data: ProfileFormValues) {
    toast.success("Profile updated", {
      description: "Your profile has been updated successfully.",
    })
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setTheme(data.theme) // Aplica o tema
    toast.success("Appearance updated", {
      description: "Your appearance settings have been updated successfully.",
    })
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast.success("Notification preferences updated", {
      description: "Your notification preferences have been updated successfully.",
    })
  }

  function onSecuritySubmit(data: SecurityFormValues) {
    toast.success("Security settings updated", {
      description: "Your security settings have been updated successfully.",
    })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <SunIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <BellIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <LockIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your public profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>This is your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormDescription>This email will be used for notifications and account recovery.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Brief description for your profile. Maximum 160 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Social Links</h3>
                  <div className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="urls.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="urls.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="urls.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Update profile</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the appearance of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...appearanceForm}>
              <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                <FormField
                  control={appearanceForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Theme</FormLabel>
                      <FormDescription>Select the theme for the dashboard.</FormDescription>
                      <FormMessage />
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid max-w-md grid-cols-3 gap-8 pt-2"
                      >
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="light" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Light</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="dark" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Dark</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="system" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="space-y-2 rounded-md bg-slate-950 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">System</span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
                <FormField
                  control={appearanceForm.control}
                  name="fontSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Font Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a font size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the font size for the application.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Update appearance</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Channels</h3>
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>Receive notifications via email.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Push Notifications</FormLabel>
                            <FormDescription>Receive push notifications on your device.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="newProposals"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New Proposals</FormLabel>
                            <FormDescription>Get notified when a new proposal is created.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="newComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New Comments</FormLabel>
                            <FormDescription>Get notified when someone comments on your document.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="mentions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Mentions</FormLabel>
                            <FormDescription>Get notified when someone mentions you.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="documentUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Document Updates</FormLabel>
                            <FormDescription>Get notified when a document you're following is updated.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Save notification preferences</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your security settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-8">
                <FormField
                  control={securityForm.control}
                  name="twoFactorAuth"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                        <FormDescription>Add an extra layer of security to your account.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={securityForm.control}
                  name="passwordChangeInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Change Interval</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an interval" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="30days">Every 30 days</SelectItem>
                          <SelectItem value="60days">Every 60 days</SelectItem>
                          <SelectItem value="90days">Every 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How often you'll be prompted to change your password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={securityForm.control}
                  name="sessionTimeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Timeout</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timeout" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="15min">15 minutes</SelectItem>
                          <SelectItem value="30min">30 minutes</SelectItem>
                          <SelectItem value="1hour">1 hour</SelectItem>
                          <SelectItem value="4hours">4 hours</SelectItem>
                          <SelectItem value="1day">1 day</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How long until your session expires due to inactivity.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Current Session</div>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Chrome on Windows</span> • Active now
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">This device</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Mobile App</div>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">iOS 16</span> • Last active 2 hours ago
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign out
                      </Button>
                    </div>
                  </div>
                </div>
                <Button type="submit">Update security settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}