THIS_DIR := $(call my-dir)

include $(REACT_ANDROID_DIR)/Android-prebuilt.mk

# If you wish to add a custom TurboModule or Fabric component in your app you
# will have to include the following autogenerated makefile.
# include $(GENERATED_SRC_DIR)/codegen/jni/Android.mk

# Includes the MK file for autolinked libraries
include $(PROJECT_BUILD_DIR)/generated/rncli/src/main/jni/Android-rncli.mk  

include $(CLEAR_VARS)

LOCAL_PATH := $(THIS_DIR)

# You can customize the name of your application .so file here.
LOCAL_MODULE := usertable_appmodules

# The generated/rncli/src/main/jni folder contains Autolinking support files.
LOCAL_C_INCLUDES := $(LOCAL_PATH) $(PROJECT_BUILD_DIR)/generated/rncli/src/main/jni
LOCAL_SRC_FILES := $(wildcard $(LOCAL_PATH)/*.cpp) $(wildcard $(PROJECT_BUILD_DIR)/generated/rncli/src/main/jni/*.cpp)
LOCAL_EXPORT_C_INCLUDES := $(LOCAL_PATH) $(PROJECT_BUILD_DIR)/generated/rncli/src/main/jni

# Here you should add any native library you wish to depend on.
LOCAL_SHARED_LIBRARIES := \
  libfabricjni \
  libfbjni \
  libfolly_runtime \
  libglog \
  libjsi \
  libreact_codegen_rncore \
  libreact_debug \
  libreact_nativemodule_core \
  libreact_render_componentregistry \
  libreact_render_core \
  libreact_render_debug \
  libreact_render_graphics \
  librrc_view \
  libruntimeexecutor \
  libturbomodulejsijni \
  libyoga

# Autolinked libraries
LOCAL_SHARED_LIBRARIES += $(call import-codegen-modules) 

# If you wish to add a custom TurboModule or Fabric component in your app you
# will have to link against it here:
# LOCAL_SHARED_LIBRARIES += \
#   libreact_codegen_<your library name>

LOCAL_CFLAGS := -DLOG_TAG=\"ReactNative\" -fexceptions -frtti -std=c++17 -Wall

include $(BUILD_SHARED_LIBRARY)
