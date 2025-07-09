"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { BellIcon, LockIcon, SunIcon, UserIcon } from "lucide-react"
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
import { useTheme } from "@/components/theme-provider"
import { Separator } from "./ui/separator"
import api from "@/services/api"

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

const changeEmailFormSchema = z.object({
  newEmail: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  passwordForEmail: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "A senha atual é obrigatória.",
  }),
  newPassword: z.string().min(8, {
    message: "A nova senha deve ter pelo menos 8 caracteres.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>
type SecurityFormValues = z.infer<typeof securityFormSchema>
type ChangeEmailFormValues = z.infer<typeof changeEmailFormSchema>;
type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export function SettingsForm() {
  const [activeTab, setActiveTab] = React.useState("security")
  const { setTheme } = useTheme()
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");
  const [isLoadingEmail, setIsLoadingEmail] = React.useState(true);

  React.useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingEmail(true);
      try {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
          throw new Error("Usuário não autenticado.");
        }
        
        const userData = JSON.parse(userDataString);
        const userId = userData?.id;

        if (!userId) {
          throw new Error("ID do usuário não encontrado no localStorage.");
        }

        const response = await api.get(`/Pessoa/${userId}`);

        if (response.data && response.data.email) {
          setCurrentUserEmail(response.data.email);
        } else {
          throw new Error("O e-mail não foi retornado pela API.");
        }
      } catch (error) {
        console.error("Falha ao buscar e-mail do usuário:", error);
        toast.error("Erro ao carregar e-mail", {
          description: "Não foi possível carregar seu e-mail atual do servidor.",
        });
      } finally {
        setIsLoadingEmail(false);
      }
    };

    fetchUserData();
  }, []);

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

  const changeEmailForm = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      newEmail: "",
      passwordForEmail: "",
    },
  });

  const changePasswordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    toast.success("Profile updated", {
      description: "Your profile has been updated successfully.",
    })
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)
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

  async function onChangeEmailSubmit(data: ChangeEmailFormValues) {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        toast.error("Erro de autenticação", {
          description: "Usuário não encontrado. Por favor, faça login novamente.",
        });
        return;
      }
      const user = JSON.parse(userData);
      const userId = user.id;

      await api.put(`/Pessoa/change-email`, {
        userId: userId,
        newEmail: data.newEmail,
        password: data.passwordForEmail,
      });
      
      setCurrentUserEmail(data.newEmail);

      toast.success("E-mail alterado com sucesso!", {
        description: "Seu endereço de e-mail foi atualizado.",
      });
      changeEmailForm.reset(); 
    } catch (error) {
      console.error("Erro ao alterar o e-mail:", error);
      toast.error("Falha ao alterar o e-mail", {
        description: "Ocorreu um erro. Verifique sua senha e tente novamente.",
      });
    }
  }

  async function onChangePasswordSubmit(data: ChangePasswordFormValues) {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        toast.error("Erro de autenticação", {
          description: "Usuário não encontrado. Por favor, faça login novamente.",
        });
        return;
      }
      const user = JSON.parse(userData);
      const userId = user.id;

      await api.put(`/Pessoa/change-password`, {
        userId: userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Senha alterada com sucesso!", {
        description: "Sua senha foi atualizada com segurança.",
      });
      changePasswordForm.reset();
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      toast.error("Falha ao alterar a senha", {
        description: "Ocorreu um erro. Verifique sua senha atual e tente novamente.",
      });
    }
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
                        className="grid lg:flex max-w-md grid-cols-3 gap-8 pt-2"
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
            <CardTitle>Segurança</CardTitle>
            <CardDescription>
              Gerencie suas configurações de segurança.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <CardTitle className="text-lg">Alterar E-mail</CardTitle>
              <CardDescription className="mt-1">
                Atualize seu endereço de e-mail.
              </CardDescription>
              <Form {...changeEmailForm}>
                <form onSubmit={changeEmailForm.handleSubmit(onChangeEmailSubmit)} className="space-y-8 mt-6">
                  <FormField control={changeEmailForm.control} name="newEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Novo E-mail</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={
                            isLoadingEmail 
                              ? "Carregando e-mail atual..." 
                              : (currentUserEmail || "novo@exemplo.com")
                          } 
                          {...field}
                          disabled={isLoadingEmail}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={changeEmailForm.control} name="passwordForEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sua Senha Atual</FormLabel>
                      <FormControl><Input type="password" placeholder="Digite sua senha" {...field} /></FormControl>
                      <FormDescription>Para sua segurança, digite sua senha para alterar o e-mail.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={changeEmailForm.formState.isSubmitting || isLoadingEmail}>
                    {changeEmailForm.formState.isSubmitting ? 'Atualizando...' : 'Atualizar E-mail'}
                  </Button>
                </form>
              </Form>
            </div>

            <Separator />

            <div>
              <CardTitle className="text-lg">Alterar Senha</CardTitle>
              <CardDescription className="mt-1">
                Atualize sua senha. Use uma senha forte e única.
              </CardDescription>
              <Form {...changePasswordForm}>
                <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)} className="space-y-8 mt-6">
                  <FormField control={changePasswordForm.control} name="currentPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha Atual</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={changePasswordForm.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={changePasswordForm.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Nova Senha</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={changePasswordForm.formState.isSubmitting}>
                    {changePasswordForm.formState.isSubmitting ? 'Atualizando...' : 'Atualizar Senha'}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}